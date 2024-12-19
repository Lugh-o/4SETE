import * as React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import RegisterActions from "../components/RegisterActions";

export default function LogIn(navigation) {
  return (
    <View style={styles.logIn}>
      <View style={[styles.textoSimples5, styles.textoPosition]}>
        <Text style={[styles.placeholder5, styles.placeholderFlexBox]}>
          4SETE
        </Text>
      </View>

      <View style={[styles.textoSimples6, styles.textoPosition]}>
        <Text style={[styles.placeholder6, styles.placeholderFlexBox]}>
          Register
        </Text>
      </View>

      <RegisterActions />

      <View style={[styles.texto, styles.textoFlexBox]}>
        <View style={[styles.boto, styles.botoSpaceBlock]}>
          <View style={styles.textoSimples}>
            <Text style={styles.placeholder}>Entrar sem credenciais</Text>
          </View>
          <Image
            style={styles.placeholderIcon}
            resizeMode="cover"
            source="placeholder.png"
          />
        </View>
      </View>
    </View>

);
};

const styles = StyleSheet.create({
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
  logIn: {
    backgroundColor: "#f0f0f0",
    width: "100%",
    height: 844,
    overflow: "hidden",
    flex: 1,
  },
});
