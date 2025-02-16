import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

console.log("Hello from Functions!");

interface Bookings {
  id: string;
  userId?: string | null;
  status?: string | null;
  from: {
    formatted_address: string;
    url: string;
  };
  to: {
    formatted_address: string;
    url: string;
  };
  time: string;
}

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: Bookings;
  schema: "public";
  old_record: null | Bookings;
}

const supabase = createClient(
  Deno.env.get("BASE_URL")!,
  Deno.env.get("BASE_SERVICE_ROLE_KEY")!
);

Deno.serve(async (req) => {
  try {
    const payload: WebhookPayload = await req.json();

    if (!payload.record.userId) {
      throw new Error("User ID is missing in the booking record.");
    }

    // Fetch user details (full_name, mobile, email)
    const { data: user, error: userError } = await supabase
      .from("profiles")
      .select("full_name, mobile, email")
      .eq("id", payload.record.userId)
      .single();

    if (userError || !user) {
      throw new Error("Error fetching user details: " + userError?.message);
    }

    // Format booking time
    const bookingTime = new Date(payload.record.time).toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    });

    // Construct the email HTML
    const emailHtml = `
      <h2>New Booking Details</h2>
      <p><strong>From:</strong> ${payload.record.from.formatted_address}</p>
      <p><strong>From URL:</strong> <a href="${payload.record.from.url}">${payload.record.from.url}</a></p>
      <p><strong>To:</strong> ${payload.record.to.formatted_address}</p>
      <p><strong>To URL:</strong> <a href="${payload.record.to.url}">${payload.record.to.url}</a></p>
      <p><strong>Time:</strong> ${bookingTime}</p>
      <hr>
      <h3>User Details</h3>
      <p><strong>Name:</strong> ${user.full_name}</p>
      <p><strong>Mobile:</strong> ${user.mobile}</p>
      <p><strong>Email:</strong> ${user.email}</p>
    `;

    // Send email via Resend
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      },
      body: JSON.stringify({
        from: "info@elitehub.lk",
        to: "abinathapleslie@gmail.com",
        subject: "New Booking Confirmation",
        html: emailHtml,
      }),
    });

    const emailResponse = await res.json();
    console.log(emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.log("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
