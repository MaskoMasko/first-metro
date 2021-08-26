import { observer } from "mobx-react-lite";
import React from "react";
import { Text, View, Image, Button } from "react-native";
import { store } from "../store/store";
import axios from "axios";
import { Chat } from "../components/Chat";

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
  return <Chat navigation={navigation}></Chat>;
});
