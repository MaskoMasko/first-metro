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
      url: `http://mockapi.ddns.net/getMyChats?id=${store.user.id}`,
    }).then((res: any) => {
      if (res.data == []) return;
      for (let chat of res.data) {
        store.setUserKeys(chat.key);
      }
    });
  };
  const nisto2 = () => {
    axios({
      method: "get",
      url: `http://mockapi.ddns.net/getMessageWithKey?key=${store.getFirst(
        store.userKeys
      )}`,
    }).then((res: any) => {
      for (let mess of res.data) {
        console.log("PORKUA:");
        console.log(mess.content);
        console.log("OD KEGA:");
        console.log(mess.username);
      }
    });
  };

  React.useEffect(() => {
    // nisto();
    // nisto2();
    // store.islogged();
  }, []);
  return <Chat navigation={navigation}></Chat>;
});
