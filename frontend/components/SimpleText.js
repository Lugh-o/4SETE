import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function SimpleText({ text, property }) {
  return <Text style={[styles.text, styles.big]}>{text}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Inter-Regular",
    color: "#1a1a1a",
  },
  big: {
    fontSize: 18,
  },
  medium: {
    fontSize: 14,
  },
  small: {
    fontSize: 10,
  },
});
