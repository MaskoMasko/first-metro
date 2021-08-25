import React from "react";
import { Button, Text, View } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import axios from "axios";

export const Image = ({ navigation }) => {
  var photo = {
    uri: "file:///data/user/0/com.awesomeproject/cache/rn_image_picker_lib_temp_4936eead-30a0-4e46-95c9-3836d351a548.jpg",
    type: "image/jpeg",
    name: "photo.jpg",
  };
  var formData = new FormData();
  formData.append("picture", photo);
  formData.append("email", "massimoTigar@gmail.com");
  formData.append("password", "password");
  formData.append("password_confirmation", "password");
  formData.append("name", "yourmom69");

  const openCamera = () => {
    launchCamera(
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
      }
    );
  };
  //   processData: false,
  //   contentType: false,
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

  //   var xhr = new XMLHttpRequest();
  //   xhr.open("POST", "http://mockapi.ddns.net/register");
  //   xhr.send(body);
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
        console.log(response);
      }
    );
  };
  return (
    <View>
      <Text>Image</Text>
      <Button title="get" onPress={openCamera}></Button>
      <Button title="get yes" onPress={openLib}></Button>
      <Button title="send" onPress={sendThat}></Button>
      <Button
        title="go ogme "
        onPress={() => navigation.navigate("Home")}
      ></Button>
    </View>
  );
};
