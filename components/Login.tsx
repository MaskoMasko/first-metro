import React, { useState } from "react";
import { Text, View, Image, ScrollView, Button, TextInput } from "react-native";
import Pusher from "pusher-js/react-native";
import axios from "axios";
export const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [empty, setEmpty] = useState(false);
  let logged = React.useRef(0).current;
  const [data, setData] = useState<any>({
    data: { name: "", email: "" },
  });
  const logout = () => {
    axios({
      method: "post",
      url: "http://mockapi.ddns.net/logout",
      headers: {
        "content-type": "application/json",
      },
    }).then((res: any) => {
      console.log(res.data);
    });
  };
  const login = (email: string, password: string) => {
    axios({
      method: "post",
      url: "http://mockapi.ddns.net/login",
      data: {
        email: email,
        password: password,
      },
      headers: {
        "content-type": "application/json",
      },
    }).then((res: any) => {
      console.log(res.config);
    });
  };

  const islogged = () => {
    axios({
      method: "get",
      url: "http://mockapi.ddns.net/checkIfLoggedIn",
    }).then((res: any) => {
      console.log(res.data);
      if (res.data == "NOT LOGGED IN") {
        logged = 1;
      } else {
        logged = 0;
      }
      console.log(logged);
    });
  };
  const session = () => {
    axios({
      method: "get",
      url: "http://mockapi.ddns.net/sessionData",
    }).then((res: any) => {
      setData(res);
      console.log(res.data);
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
              return login(email.toLowerCase(), password);
            }
            setEmpty(true);
          }}
        ></Button>
        <View>{empty ? <Text>Your form is empty!!</Text> : null}</View>
      </View>
      <Button
        title="logout"
        onPress={() => {
          logout();
        }}
      ></Button>
      <Button title="islogged?" onPress={islogged}></Button>
      <Button
        title="session"
        onPress={() => {
          if (logged === 0) {
            navigation.navigate("Chat");
            session();
          }
        }}
      ></Button>
      <View>
        {data.data == undefined ? (
          <Text>Not valid user!</Text>
        ) : data.data.name == "" ? (
          <Text style={{ backgroundColor: "red", padding: 20 }}>
            Nothing yet
          </Text>
        ) : (
          <View>
            <Text>{data.data.name}</Text>
            <Text>{data.data.email}</Text>
            <Image
              source={{
                uri: `http://mockapi.ddns.net/${data.data.image}`,
              }}
              style={{ width: 300, height: 300 }}
            ></Image>
          </View>
        )}
      </View>
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
