import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import FormTextField from "./FormTextField";
import SimpleButton from "./SimpleButton";
import { sendPasswordResetLink } from "../services/AuthService";

// ISSO SÓ VAI FUNCIONAR DEPOIS DO BREEZE
export default function ForgotPasswordActions() {
  const [email, setEmail] = React.useState("");
  const [resetStatus, setResetStatus] = React.useState("");
  const [errors, setErrors] = React.useState({});

  async function handleForgotPassword() {
    setErrors({});
    setResetStatus("");
    try {
      const status = await sendPasswordResetLink(email);
      setResetStatus(status);
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  }

  return (
    <View style={styles.acoes}>
      <View style={styles.campos}>
        {resetStatus && <Text>{resetStatus}</Text>}
        <FormTextField
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          errors={errors.email}
        />
      </View>
      <SimpleButton
        title="E-mail Reset Password Link"
        onPress={handleForgotPassword}
      />
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
    alignItems: "center",
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
