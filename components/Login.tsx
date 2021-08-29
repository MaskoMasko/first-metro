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
    store.islogged();
  }, []);

  // Want to use async/await? Add the async keyword to your outer function/method.
  // Enable pusher logging - don't include this in production

  // Pusher.logToConsole = true;

  // var pusher = new Pusher("0c9a424d02e39d31aada", {
  //   cluster: "eu",
  // });

  // var channel = pusher.subscribe("chat");
  // channel.bind("SendMessage", function (data) {
  //   console.log(JSON.stringify(data));
  // });
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
            store.login(email, password);
            store.islogged();
            if (store.user != undefined) {
              navigation.navigate("Chat");
            }
            console.log(store.user);
          }
        }}
      ></CustomButton>
      <View>{empty ? <Text>Something went wrong...</Text> : null}</View>
    </View>
  );
};

// const pusher = new Pusher("local", {
//   cluster: "mt1",
//   authEndpoint: "http://mockapi.ddns.net/",
//   auth: {
//     headers: {
//       "Content-Type": "application/json",
//       "X-CSRF-TOKEN": "CSRF-Token",
//     },
//   },
// });
// let authorizer = (channel: any, options: any) => {
//   return {
//     authorize: (socketId: any, callback: any) => {
//       fetch("/login", {
//         method: "POST",
//         headers: new Headers({ "Content-Type": "application/json" }),
//         body: JSON.stringify({
//           email: "masko@gmail.com",
//           password: "password",
//         }),
//       })
//         .then((res) => {
//           console.log(res);
//           if (!res.ok) {
//             throw new Error(`Received ${res.statusCode} from /login`);
//           }
//           return res.json();
//         })
//         .then((data) => {
//           console.log(data);
//           callback(null, data);
//         })
//         .catch((err) => {
//           callback(new Error(`Error calling auth endpoint: ${err}`), {
//             auth: "",
//           });
//         });
//     },
//   };
// };

// const pusher = new Pusher("local", {
//   cluster: "mt1",
//   authorizer: authorizer,
// });
