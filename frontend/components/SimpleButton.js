import * as React from "react";
import { Text, StyleSheet, View, TouchableOpacity, SafeAreaView } from "react-native";

export default function SimpleButton({title, ...rest}) {
  return (
    <SafeAreaView style={[styles.simples, styles.simplesFlexBox]}>
      <View style={styles.boto}>
        <TouchableOpacity style={styles.button} {...rest}>
          <Text style={styles.buttonTitle}>{title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonTitle: {
    textAlign: "center",
  },
  button: {
    width: "100%",
    height: "100%",
  },
  simplesFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  placeholder: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#1a1a1a",
    textAlign: "left",
  },
  boto: {
    alignItems: "flex-end",
    paddingHorizontal: 8,
    paddingVertical: 0,
    flexDirection: "row",
  },
  simples: {
    alignSelf: "stretch",
    backgroundColor: "#fff",
    flex: 1,
    width: "100%",
    height: 42,
    padding: 12,
  },
});
