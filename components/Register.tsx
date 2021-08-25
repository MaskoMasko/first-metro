import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import React, { useState } from "react";
import { Text, View, TextInput, Button } from "react-native";
import axios from "axios";

export const Register = () => {
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
    <View>
      <Text>Name:</Text>
      <TextInput value={name} onChangeText={(e) => setName(e)}></TextInput>
      <Text>Select FILE:</Text>
      {/* <Button title="get" onPress={openCamera}></Button> */}
      <Button title="get yes" onPress={openLib}></Button>
      <Text>Email:</Text>
      <TextInput
        value={email}
        onChangeText={(e) => setEmail(e.toLowerCase())}
      ></TextInput>
      <Text>Password:</Text>
      <TextInput
        value={password}
        onChangeText={(e) => setPassword(e)}
      ></TextInput>
      <Text>Confirm Password:</Text>
      <TextInput
        value={password1}
        onChangeText={(e) => setPassword1(e)}
      ></TextInput>
      <Button title="submit" onPress={sendThat}></Button>
      {password === "" ? null : password === password1 ? (
        <Text>Welcome</Text>
      ) : (
        <Text>Something is wrong....</Text>
      )}
    </View>
  );
};
