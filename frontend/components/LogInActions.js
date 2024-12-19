import * as React from "react";
import { Text, StyleSheet, View, Image, Platform } from "react-native";
import axios from "axios";
import FormTextField from "./FormTextField";
import SimpleButton from "./SimpleButton";

export default function LogInActions() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});

  async function handleLogin() {
    setErrors({});
    try {
      const { data } = await axios.post(
        "http://192.168.43.3:8080/api/login",
        {
          email,
          password,
          device_name: `${Platform.OS} ${Platform.Version}`,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      const { data: user } = await axios.get(
        "http://192.168.43.3:8080/api/user",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
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
      </View>

      <View style={styles.campos}>
        <SimpleButton title="Entrar" onPress={handleLogin} />

        <View style={styles.textoFlexBox}>
          <View style={[styles.boto1, styles.botoSpaceBlock]}>
            <View style={[styles.textoSimples2, styles.inputFlexBox]}>
              <Text style={styles.placeholder}>Não tenho uma conta</Text>
            </View>
            <Image
              style={styles.placeholderIcon1}
              resizeMode="cover"
              source="placeholder.png"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  textoFlexBox: {
    height: 42,
    alignItems: "center",
    flexDirection: "row",
    padding: 12,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  placeholder: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#1a1a1a",
    textAlign: "left",
  },
  input1: {
    alignSelf: "stretch",
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    height: 48,
    padding: 12,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignSelf: "stretch",
  },
  placeholderIcon: {
    width: 24,
    height: 24,
  },
  input3: {
    gap: 12,
    alignSelf: "stretch",
  },
  campos: {
    gap: 12,
    alignSelf: "stretch",
  },
  textoSimples2: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  placeholderIcon1: {
    width: 16,
    height: 16,
  },
  boto1: {
    gap: 12,
  },
  acoes: {
    marginLeft: -150,
    top: 337,
    width: 300,
    gap: 24,
    left: "50%",
    alignItems: "flex-end",
    position: "absolute",
  },
});
