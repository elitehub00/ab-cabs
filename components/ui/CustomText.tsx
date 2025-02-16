import React from 'react';
import { Text, TextProps } from 'react-native-paper';

const NoScaleText = (props: TextProps<any>) => {
    return <Text {...props} allowFontScaling={false} />;
  };
  
  export default NoScaleText;
