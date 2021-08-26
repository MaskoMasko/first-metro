import { observer } from "mobx-react-lite";
import React from "react";
import { Text, View, Image, Button } from "react-native";
import { store } from "../store/store";

export const ChatScreen = observer(({ navigation }) => {
  return (
    <View>
      <View>
        {store.user == undefined ? (
          <Text>Loading...</Text>
        ) : (
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
        )}
      </View>
      <Button
        title="logut"
        onPress={() => {
          store.logout();
          navigation.navigate("Home");
        }}
      ></Button>
    </View>
  );
});
