import React from "react";
import { Text, View } from "react-native";

export const Messages = () => {
  return (
    <View
      style={{
        backgroundColor: "red",
        height: "auto",
      }}
    >
      <Text
        style={{ backgroundColor: "blue", width: 100, alignSelf: "flex-end" }}
      >
        mi
      </Text>
      <Text
        style={{
          alignSelf: "flex-start",
          backgroundColor: "yellow",
          width: 100,
        }}
      >
        ti
      </Text>
    </View>
  );
};
