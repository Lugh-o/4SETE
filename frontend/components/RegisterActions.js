import * as React from "react";
import { Text, StyleSheet, View, Image, Platform } from "react-native";
import FormTextField from "./FormTextField";
import SimpleButton from "./SimpleButton";
import { register, loadUser } from "../services/AuthService";
import AuthContext from "../context/AuthContext";

export default function RegisterActions() {
  const { setUser } = React.useContext(AuthContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setpasswordConfirmation] = React.useState("");
  const [errors, setErrors] = React.useState({});

  async function handleRegister({ navigation }) {
    setErrors({});
    try {
      await register({
        name: "null",
        email,
        password,
        password_confirmation: passwordConfirmation,
        device_name: `${Platform.OS} ${Platform.Version}`,
      });
      const user = await loadUser();
      setUser(user);
      navigation.replace("Home");
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  }

  return (
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
        <FormTextField
          label="Repita sua senha"
          secureTextEntry={true}
          value={passwordConfirmation}
          onChangeText={(text) => setpasswordConfirmation(text)}
          errors={errors.password_confirmation}
        />
      </View>
      <SimpleButton title="Criar Conta" onPress={handleRegister} />
    </View>
  );
}
const styles = StyleSheet.create({
  campos: {
    gap: 12,
  },
  acoes: {
    gap: 24,
  },
});
