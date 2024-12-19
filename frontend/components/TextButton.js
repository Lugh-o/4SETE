import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function TextButton({ title, ...rest }) {
  return (
    <View style={[styles.estadodefault]}>
      <TouchableOpacity {...rest}>
        <Text style={styles.buttonTitle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonTitle: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#1a1a1a",
  },
  estadodefault: {
    padding: 24,
    gap: 12,
    alignSelf: "stretch",
    alignItems: "center",
  },
});
