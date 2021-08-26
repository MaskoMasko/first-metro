import { observer } from "mobx-react-lite";
import React from "react";
import { Text, View, Image, Button } from "react-native";
import { store } from "../store/store";
import axios from "axios";

export const ChatScreen = observer(({ navigation }) => {
  const nisto = () => {
    axios({
      method: "get",
      url: "http://mockapi.ddns.net/getMyChats?id=1",
    }).then((res: any) => {
      console.log(res);
    });
  };

  React.useEffect(() => {
    nisto();
    store.islogged();
  }, []);
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
          store.islogged();
          navigation.navigate("Home");
        }}
      ></Button>
    </View>
  );
});
