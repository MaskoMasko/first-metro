import React from "react";
import { Text, View, Image, Button } from "react-native";
import { store } from "../store/store";
import { Messages } from "./Messages";

export const Chat = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: "#C8F3A9", height: 850 }}>
      <View style={{ backgroundColor: "#9CCB75" }}>
        {store.user == undefined ? (
          <Text>Loading...</Text>
        ) : (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 24,
                margin: 20,
              }}
            >
              {store.user.name}
            </Text>
            <Image
              source={{
                uri: `http://mockapi.ddns.net/${store.user.image}`,
              }}
              style={{ width: 50, height: 50, margin: 20 }}
            ></Image>
          </View>
        )}
      </View>
      <Button
        title="logut"
        onPress={() => {
          store.logout();
          store.islogged();
          navigation.navigate("Home");
        }}
      ></Button>
      <Messages></Messages>
    </View>
  );
};
