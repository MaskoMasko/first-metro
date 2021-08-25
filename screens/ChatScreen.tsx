import React from "react";
import { Text, View, Image } from "react-native";
import { store } from "../store/store";

export const ChatScreen = () => {
  return (
    <View>
      <Text>CHat rookm</Text>
      <Text>{store.user.name}</Text>
      <Image
        source={{
          uri: `http://mockapi.ddns.net/${store.user.image}`,
        }}
        style={{ width: 300, height: 300 }}
      ></Image>
    </View>
  );
};
