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
        style={{
          backgroundColor: "aliceblue",
          width: 100,
          alignSelf: "flex-start",
        }}
      >
        mi
      </Text>
      <Text
        style={{
          alignSelf: "flex-end",
          backgroundColor: "yellow",
          width: 100,
        }}
      >
        ti
      </Text>
    </View>
  );
};
