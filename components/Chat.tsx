import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Text, View, Image, Button, ScrollView, TextInput } from "react-native";
import { store } from "../store/store";
import { Messages } from "./Messages";
import Pusher from "pusher-js/react-native";

export const Chat = observer(({ navigation }) => {
  const [messageText, setMessageText] = useState("");

  // Pusher.logToConsole = true;

  var pusher = new Pusher("0c9a424d02e39d31aada", {
    cluster: "eu",
  });

  var channel = pusher.subscribe("chat");
  channel.bind("SendMessage", function (data) {
    console.log(JSON.stringify(data.data));
  });

  React.useEffect(() => {
    store.getMessages();
  }, []);
  React.useEffect(() => {
    if (messageText != "") {
      store.sendMessage(messageText);
    }
  }, [messageText]);

  return (
    <View style={{ backgroundColor: "#C8F3A9", height: 850 }}>
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
      <ScrollView>
        {store.allMessages.map((messInfo, id) => {
          return (
            <View key={id}>
              <Text>{messInfo.content}</Text>
            </View>
          );
        })}
      </ScrollView>
      <TextInput
        style={{ padding: 15, margin: 10, backgroundColor: "#E9EAE7" }}
        placeholder="message"
        onSubmitEditing={(e) => {
          console.log(e.nativeEvent.text);
          setMessageText(e.nativeEvent.text);
        }}
      ></TextInput>
      {/* <Messages></Messages> */}
    </View>
  );
});
