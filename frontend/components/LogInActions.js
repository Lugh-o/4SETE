import * as React from "react";
import { StyleSheet, View, Platform } from "react-native";
import FormTextField from "./FormTextField";
import SimpleButton from "./SimpleButton";
import { login, loadUser } from "../services/AuthService";
import AuthContext from "../context/AuthContext";

export default function LogInActions({ ...rest }) {
  const { setUser } = React.useContext(AuthContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});

  async function handleLogin() {
    setErrors({});
    try {
      await login({
        email,
        password,
        device_name: `${Platform.OS} ${Platform.Version}`,
      });
      const user = await loadUser();
      setUser(user);
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  }

  return (
    <View {...rest}>
      <View style={styles.acoes}>
        <View style={styles.campos}>
          <FormTextField
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            errors={errors.email}
          />
          <FormTextField
            label="Senha"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
            errors={errors.password}
          />
        </View>
        <SimpleButton title="Entrar" onPress={handleLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
