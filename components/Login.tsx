import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Text, View, TextInput } from "react-native";
import axios from "axios";

export const Login = observer(() => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [empty, setEmpty] = React.useState(false);

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
      console.log(res.data);
    });
  };
  return (
    <Text></Text>
    //   <View
    //     style={{
    //       borderWidth: 3,
    //       borderColor: "black",
    //       backgroundColor: "aliceblue",
    //       marginVertical: 20,
    //     }}
    //   >
    //     <Text>Email:</Text>
    //     <TextInput value={email} onChangeText={(e) => setEmail(e)}></TextInput>
    //     <Text>Password:</Text>
    //     <TextInput
    //       value={password}
    //       onChangeText={(e) => setPassword(e)}
    //       secureTextEntry={true}
    //     ></TextInput>
    //     <Button
    //       title="submit"
    //       onPress={() => {
    //         if (password != "" && email != "") {
    //           setEmpty(false);
    //           return login(email.toLowerCase(), password);
    //         }
    //         return setEmpty(true);
    //       }}
    //     ></Button>
    //     <View>{empty ? <Text>Your form is empty!!</Text> : null}</View>
    //   </View>
  );
});
