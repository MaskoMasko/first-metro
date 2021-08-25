import React from "react";
import { Button, Text, View } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Image } from "../components/Image";

export const ImageScreen = ({ navigation }) => {
  return <Image navigation={navigation}></Image>;
};
