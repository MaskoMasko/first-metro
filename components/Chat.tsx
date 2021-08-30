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

  React.useEffect(() => {
    if (messageText != "") {
      store.sendMessage(messageText);
    } else {
      setSent(false);
    }
  }, [messageText]);

  Pusher.logToConsole = true;
  var pusher = new Pusher("0c9a424d02e39d31aada", {
    cluster: "eu",
  });
  var channel = pusher.subscribe("chat");
  //
  console.log(pusher.timeline.options.params);
  var nisto = channel.bind("SendMessage", function sendMessage(data) {
    if (messageText != "") {
      store.setYourMessages(data);
      setMessageText("");
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
      </View>
      <Button
        title="logut"
        onPress={() => {
          store.logout();
          store.islogged();
          store.setUserToNothing();
          navigation.navigate("Home");
        }}
      ></Button>
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
