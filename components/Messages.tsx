import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { store } from "../store/store";

export const Messages = () => {
  return (
    <View
      style={{
        backgroundColor: "red",
        height: "auto",
      }}
    >
      <View style={[styles.messageContainer, { alignSelf: "flex-start" }]}>
        <Image
          source={
            {
              // uri: `http://mockapi.ddns.net/${store.user.image}`,
            }
          }
          style={[styles.userImage, { marginLeft: 5, marginRight: 0 }]}
        ></Image>
        <Text
          style={[
            styles.message,
            { backgroundColor: "#0066CC", color: "white" },
          ]}
        >
          mi
        </Text>
      </View>
      <View style={styles.messageContainer}>
        <Text style={[styles.message, { textAlign: "right" }]}>ti</Text>
        <Image
          source={
            {
              // uri: `http://mockapi.ddns.net/${store.user.image}`,
            }
          }
          style={styles.userImage}
        ></Image>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    alignSelf: "flex-end",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    backgroundColor: "aliceblue",
    minWidth: 100,
    padding: 10,
    margin: 10,
    borderRadius: 15,
  },
  userImage: {
    width: 35,
    height: 35,
    margin: 5,
    marginLeft: 0,
    backgroundColor: "blue",
  },
});
