import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  Button,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { store } from "../store/store";
import { Messages } from "./Messages";
import Pusher from "pusher-js/react-native";
import { useQuery } from "react-query";
import axios from "axios";

export const Chat = observer(({ navigation }) => {
  const [messageText, setMessageText] = useState("");
  const [sent, setSent] = useState(false);

  const [sentMessage, setSentMessage] = useState(null);
  // const { isLoading, isError, data } = useQuery(["sendMessage", sent], () => {
  //   axios({
  //     method: "post",
  //     url: "http://mockapi.ddns.net/message",
  //     data: {
  //       message: messageText,
  //     },
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //   }).then((res: any) => {
  //     store.setYourMessages(messageText)
  //     console.log(res);
  //   });
  // });
  // console.log(data);

  React.useEffect(() => {
    if (messageText != "") {
      store.sendMessage(messageText);
    } else {
      setSent(false);
    }
  }, [messageText]);

  // Pusher.logToConsole = true;
  var pusher = new Pusher("0c9a424d02e39d31aada", {
    cluster: "eu",
  });
  var channel = pusher.subscribe("chat");
  //
  console.log(pusher);
  var nisto = channel.bind("SendMessage", function GOYES(data) {
    if (messageText != "") {
      store.setYourMessages(data);
    }
    return data;
  });
  console.log(nisto.callbacks._callbacks._SendMessage[0].fn(messageText));

  return (
    <View style={{ backgroundColor: "#e4f5e8", height: 850 }}>
      <View style={{ backgroundColor: "#9CCB75" }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 24,
            margin: 20,
          }}
        >
          Global Chat
        </Text>
        {/* {store.user == undefined ? (
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
        )} */}
      </View>
      <Button
        title="logut"
        onPress={() => {
          store.logout();
          store.setUserToNothing();
          navigation.navigate("Home");
        }}
      ></Button>
      {/* <ScrollView>
        {store.allMessages.map((messInfo, id) => {
          return (
            <View key={id}>
              <Text>{messInfo.content}</Text>
            </View>
          );
        })}
      </ScrollView> */}
      <Messages></Messages>
      <TextInput
        style={{ padding: 15, margin: 10, backgroundColor: "#E9EAE7" }}
        placeholder="message"
        onSubmitEditing={(e) => {
          setMessageText(e.nativeEvent.text);
          setSent(true);
        }}
      ></TextInput>
    </View>
  );
});
