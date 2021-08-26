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
  }, []);
  const nisto = () => {
    axios({
      method: "get",
      url: "http://mockapi.ddns.net/getMyChats?id=1",
    }).then((res: any) => {
      console.log(res);
    });
  };

  // Want to use async/await? Add the async keyword to your outer function/method.
  // Enable pusher logging - don't include this in production
  // Pusher.logToConsole = true;

  var pusher = new Pusher("be069965d415f82969e7", {
    cluster: "eu",
  });

  var channel = pusher.subscribe("pTvb4nzZpFCciOdo2YcbwyQNCSi06cJS");
  channel.bind("SendPrivateMessage", function (data: any) {
    // console.log(JSON.stringify(data));
  });
  return (
    <View
      style={{
        marginVertical: 20,
      }}
    >
      <TextInput
        style={{ padding: 15, margin: 10, backgroundColor: "#E9EAE7" }}
        value={email}
        placeholder="email"
        onChangeText={(e) => setEmail(e)}
      ></TextInput>
      <TextInput
        placeholder="password"
        style={{ padding: 15, margin: 10, backgroundColor: "#E9EAE7" }}
        value={password}
        onChangeText={(e) => setPassword(e)}
      ></TextInput>
      <CustomButton
        color="white"
        title="SUMBIT"
        backgroundColor="#5AC013"
        onPress={() => {
          store.login(email.toLowerCase(), password);
          if (password != "" && email != "") {
            setEmpty(false);
            store.login(email.toLowerCase(), password);
            store.islogged();
            if (store.isLogged) {
              store.session();
              navigation.navigate("Chat");
            }
          } else {
            setEmpty(true);
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
