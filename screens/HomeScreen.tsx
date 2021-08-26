import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CustomButton } from "../components/CustomButton";
import { Login } from "../components/Login";

export const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.loginContainer}>
      <View style={styles.loginBox}>
        <Login navigation={navigation}></Login>
        <View style={{ alignItems: "center" }}>
          <Text onPress={() => navigation.navigate("Register")}>
            You dont have acc...
            <Text
              style={{
                color: "#5AC013",
              }}
            >
              Create Account
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor: "#9CCB75",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  loginBox: {
    width: 350,
    height: 360,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
