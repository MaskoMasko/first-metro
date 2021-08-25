import React from "react";
import { Text, Linking, View, Button } from "react-native";

export const RegisterScreen = ({ navigation }: any) => {
  return (
    <View>
      <Button
        title="Register"
        onPress={() => Linking.openURL("http://mockapi.ddns.net/register")}
      ></Button>
      <Button
        title="go to login"
        onPress={() => navigation.navigate("Home")}
      ></Button>
    </View>
  );
};
