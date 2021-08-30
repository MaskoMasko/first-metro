import React from "react";
import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import { store } from "../store/store";
import { useQuery } from "react-query";

export const Messages = () => {
  // const { isLoading, data, isError } = useQuery("getMessages", () => {
  //   return store.getMessages();
  // });
  const { isLoading, isError, data } = useQuery("repoData", () =>
    fetch("http://mockapi.ddns.net/getMessage?whereToStart=0&howMany=15").then(
      (res) => res.json()
    )
  );
  // console.log(data);

  if (isError) {
    return <Text>Error...</Text>;
  }
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <ScrollView>
      <View>
        {data.map((messageInfo, id) => {
          return (
            <View key={id}>
              {messageInfo.user.email == store.user.email ? (
                <View style={styles.messageContainer}>
                  <View>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "bold",
                        marginBottom: -10,
                        marginTop: -10,
                        marginLeft: 20,
                      }}
                    >
                      {messageInfo.user.name}
                    </Text>
                    <Text style={[styles.message, { textAlign: "right" }]}>
                      {messageInfo.content}
                    </Text>
                  </View>
                  <Image
                    source={{
                      uri: `http://mockapi.ddns.net/${store.user.image}`,
                    }}
                    style={styles.userImage}
                  ></Image>
                </View>
              ) : (
                <View
                  style={[styles.messageContainer, { alignSelf: "flex-start" }]}
                >
                  <Image
                    source={{
                      uri: `http://mockapi.ddns.net/${messageInfo.user.image}`,
                    }}
                    style={[
                      styles.userImage,
                      { marginLeft: 5, marginRight: 0 },
                    ]}
                  ></Image>
                  <View>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "bold",
                        marginBottom: -10,
                        marginTop: -10,
                        marginLeft: 20,
                      }}
                    >
                      {messageInfo.user.name}
                    </Text>
                    <Text
                      style={[
                        styles.message,
                        { backgroundColor: "#0066CC", color: "white" },
                      ]}
                    >
                      {messageInfo.content}
                    </Text>
                  </View>
                </View>
              )}
              {/* <Text>{messageInfo.content}</Text> */}
            </View>
          );
        })}
      </View>
      <View>
        {store.yourMessages.map((message, id) => {
          return (
            <View style={styles.messageContainer} key={id}>
              <View>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "bold",
                    marginBottom: -10,
                    marginTop: -10,
                    marginLeft: 20,
                  }}
                >
                  {store.user.name}
                </Text>
                <Text style={[styles.message, { textAlign: "right" }]}>
                  {message}
                </Text>
              </View>
              <Image
                source={{
                  uri: `http://mockapi.ddns.net/${store.user.image}`,
                }}
                style={styles.userImage}
              ></Image>
            </View>
          );
        })}
      </View>
    </ScrollView>
    // <View
    //   style={{
    //     backgroundColor: "red",
    //     height: "auto",
    //   }}
    // >
    // <View style={[styles.messageContainer, { alignSelf: "flex-start" }]}>
    //   <Image
    //     source={
    //       {
    //         // uri: `http://mockapi.ddns.net/${store.user.image}`,
    //       }
    //     }
    //     style={[styles.userImage, { marginLeft: 5, marginRight: 0 }]}
    //   ></Image>
    //   <Text
    //     style={[
    //       styles.message,
    //       { backgroundColor: "#0066CC", color: "white" },
    //     ]}
    //   >
    //     mi
    //   </Text>
    // </View>
    // <View style={styles.messageContainer}>
    //   <Text style={[styles.message, { textAlign: "right" }]}>ti</Text>
    //   <Image
    //     source={
    //       {
    //         // uri: `http://mockapi.ddns.net/${store.user.image}`,
    //       }
    //     }
    //     style={styles.userImage}
    //   ></Image>
    // </View>
    // </View>
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
