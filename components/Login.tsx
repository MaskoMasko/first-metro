import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  Button,
  Modal,
  TextInput,
} from "react-native";
import Pusher from "pusher-js/react-native";
import axios from "axios";
import { store } from "../store/store";
import { CustomButton } from "./CustomButton";
export const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [empty, setEmpty] = useState(false);

  React.useEffect(() => {
    store.logout();
    store.islogged();
  }, []);
  return (
    <View
      style={{
        marginVertical: 20,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          margin: 10,
          marginTop: 0,
        }}
      >
        Login
      </Text>
      <TextInput
        style={{ padding: 15, margin: 10, backgroundColor: "#E9EAE7" }}
        placeholder="email"
        onSubmitEditing={(e) => {
          console.log(e.nativeEvent.text);
          setEmail(e.nativeEvent.text.toLowerCase());
        }}
      ></TextInput>
      <TextInput
        placeholder="password"
        style={{ padding: 15, margin: 10, backgroundColor: "#E9EAE7" }}
        onSubmitEditing={(e) => {
          console.log(e.nativeEvent.text);
          setPassword(e.nativeEvent.text);
        }}
      ></TextInput>
      <CustomButton
        color="white"
        title="SUBMIT"
        backgroundColor="#5AC013"
        onPress={() => {
          if (password != "" && email != "") {
            // store.logout();
            store.islogged();
            store.login(email, password);
            store.session();
            if (store.user != undefined) {
              navigation.navigate("Chat");
            }
            // console.log(store.user);
          }
        }}
      ></CustomButton>
      <View>{empty ? <Text>Something went wrong...</Text> : null}</View>
    </View>
  );
};
