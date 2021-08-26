import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import React, { useState } from "react";
import { Text, View, TextInput, Button } from "react-native";
import axios from "axios";
import { CustomButton } from "./CustomButton";
import { store } from "../store/store";
import { observer } from "mobx-react-lite";

export const Register = observer(({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [image, setImage] = useState("");
  var photo = {
    uri: image,
    type: "image/jpeg",
    name: "photo.jpg",
  };
  //   const openCamera = () => {
  //     launchCamera(
  //       {
  //         mediaType: "photo",
  //         maxHeight: 500,
  //         maxWidth: 500,
  //         includeBase64: false,
  //       },
  //       (response) => {
  //         if (response.didCancel) {
  //           console.log("User cancelled image picker");
  //         }
  //       }
  //     );
  //   };
  const sendThat = () => {
    axios({
      method: "post",
      url: "http://mockapi.ddns.net/register",
      data: formData,
    })
      .then((res: any) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const openLib = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        maxHeight: 500,
        maxWidth: 500,
        includeBase64: false,
      },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        }
        setImage(response.assets[0].uri);
      }
    );
  };
  var formData = new FormData();
  formData.append("picture", photo);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("password_confirmation", password1);
  formData.append("name", name);
  return (
    <View
      style={{
        backgroundColor: "#9CCB75",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 350,
          height: 550,
          backgroundColor: "white",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            margin: 10,
          }}
        >
          Register
        </Text>
        <TextInput
          style={{ padding: 15, margin: 10, backgroundColor: "#E9EAE7" }}
          value={name}
          placeholder="name"
          onChangeText={(e) => setName(e)}
        ></TextInput>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 14,
            marginHorizontal: 10,
            marginVertical: 5,
          }}
        >
          Select FILE:
        </Text>
        {/* <Button title="get" onPress={openCamera}></Button> */}
        <CustomButton
          title="Get Image"
          color="black"
          backgroundColor="#BAF094"
          onPress={openLib}
        ></CustomButton>
        <TextInput
          style={{ padding: 15, margin: 10, backgroundColor: "#E9EAE7" }}
          value={email}
          placeholder="email"
          onChangeText={(e) => setEmail(e)}
        ></TextInput>
        <TextInput
          style={{ padding: 15, margin: 10, backgroundColor: "#E9EAE7" }}
          value={password}
          placeholder="password"
          onChangeText={(e) => setPassword(e)}
        ></TextInput>
        <TextInput
          style={{ padding: 15, margin: 10, backgroundColor: "#E9EAE7" }}
          value={password1}
          placeholder="confirm password"
          onChangeText={(e) => setPassword1(e)}
        ></TextInput>
        <CustomButton
          color="white"
          title="SUMBIT"
          backgroundColor="#5AC013"
          onPress={() => {
            sendThat();
            // store.login(email.toLowerCase(), password);
            // store.islogged();
            // store.session();
            // navigation.navigate("Chat");
          }}
        ></CustomButton>
        {password === "" ? null : password === password1 ? null : (
          <Text>Wrong Password...</Text>
        )}
      </View>
    </View>
  );
});
