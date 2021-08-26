import React, { useState } from "react";
import { Text, View, Image, ScrollView, Button, TextInput } from "react-native";
import Pusher from "pusher-js/react-native";
import axios from "axios";
import { store } from "../store/store";
export const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [empty, setEmpty] = useState(false);

  React.useEffect(() => {
    if (store.isLogged) {
      store.logout();
    }
  }, []);

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
    <ScrollView>
      <View
        style={{
          borderWidth: 3,
          borderColor: "black",
          backgroundColor: "aliceblue",
          marginVertical: 20,
        }}
      >
        <Text>Email:</Text>
        <TextInput value={email} onChangeText={(e) => setEmail(e)}></TextInput>
        <Text>Password:</Text>
        <TextInput
          value={password}
          onChangeText={(e) => setPassword(e)}
        ></TextInput>
        <Button
          title="submit"
          onPress={() => {
            if (password != "" && email != "") {
              setEmpty(false);
              return store.login(email.toLowerCase(), password);
            }
            setEmpty(true);
          }}
        ></Button>
        <View>{empty ? <Text>Your form is empty!!</Text> : null}</View>
      </View>
      <Button
        title="logout"
        onPress={() => {
          if (store.isLogged) {
            store.logout();
          }
        }}
      ></Button>
      <Button title="islogged?" onPress={store.islogged}></Button>
      <Button
        title="session"
        onPress={() => {
          if (store.isLogged) {
            store.session();
            navigation.navigate("Chat");
          }
        }}
      ></Button>
      <View></View>
    </ScrollView>
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
