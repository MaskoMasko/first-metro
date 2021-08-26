import React from "react";
import { Text, TouchableOpacity } from "react-native";

export const CustomButton = ({ title, onPress, color, backgroundColor }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={{
        backgroundColor,
        width: 330,
        margin: 10,
        height: 60,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 0,
      }}
    >
      <Text style={{ fontSize: 18, color }}>{title}</Text>
    </TouchableOpacity>
  );
};
