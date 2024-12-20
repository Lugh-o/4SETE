import * as React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import RegisterActions from "../components/RegisterActions";
import PageTitle from "../components/PageTitle";
import Logo from "../components/Logo";
import SecondaryButton from "../components/SecondaryButton";

export default function RegisterScreen({ navigation }) {
  return (
    <View style={styles.register}>
      <Logo style={styles.logo} />

      <PageTitle style={styles.pageTitle} label="Log In" />

      <View style={styles.actionsView}>
        <RegisterActions />
        <SecondaryButton
          title="Cancelar"
          onPress={() => {
            navigation.navigate("Login");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actionsView: {
    position: "absolute",
    top: 337,
    gap: 12,
  },
  logo: {
    alignSelf: "center",
    position: "absolute",
    top: 207,
  },
  pageTitle: {
    top: 255,
  },
  inputFlexBox1: {
    alignItems: "center",
    flexDirection: "row",
  },
  textoPosition: {
    width: 160,
    marginLeft: -80,
    left: "50%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
  },
  placeholderFlexBox: {
    textAlign: "center",
    color: "#1a1a1a",
    flex: 1,
  },
  textoSimples: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  boto: {
    gap: 12,
  },
  texto: {
    top: 771,
    left: 170,
    position: "absolute",
    padding: 12,
  },
  texto1: {
    alignSelf: "stretch",
  },
  placeholder5: {
    fontSize: 48,
    fontWeight: "700",
    fontFamily: "Westgate",
  },
  textoSimples5: {
    top: 207,
  },
  placeholder6: {
    fontSize: 18,
    fontFamily: "Inter-Regular",
    textAlign: "center",
  },
  textoSimples6: {
    top: 255,
  },
  register: {
    backgroundColor: "#f0f0f0",
    margin: 45,
  },
});
