import React, { useState } from "react";
import { Text, View, TextInput, Button } from "react-native";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  return (
    <View>
      <Text>Name:</Text>
      <TextInput value={name} onChangeText={(e) => setName(e)}></TextInput>
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={(e) => setEmail(e)}></TextInput>
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
      <Button title="submit"></Button>
      {password === "" ? null : password === password1 ? (
        <Text>Welcome</Text>
      ) : (
        <Text>Something is wrong....</Text>
      )}
    </View>
  );
};
