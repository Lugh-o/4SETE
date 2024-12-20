import { Text, View, StyleSheet, Button } from "react-native";
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { logout } from "../services/AuthService";
import Card from "../components/Card";

export default function HomeScreen(navigation) {
  const { user, setUser } = useContext(AuthContext);

  async function handleLogout() {
    await logout();
    setUser(null);
  }

  return (
    <View style={styles.container}>
      <Card />

      <Text style={styles.text}>Welcome home, {user.name}</Text>
      <Button title="Logout" onPress={handleLogout}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
  },
});
