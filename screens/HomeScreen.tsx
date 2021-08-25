import React from "react";
import { View, Button } from "react-native";

export const HomeScreen = ({ navigation }: any) => {
  return (
    <View>
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      ></Button>
      <Button
        title="go to login"
        onPress={() => navigation.navigate("Chat")}
      ></Button>
      <Button
        title="go to get"
        onPress={() => navigation.navigate("Image")}
      ></Button>
    </View>
  );
};
