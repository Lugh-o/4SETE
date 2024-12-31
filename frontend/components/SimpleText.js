import { StyleSheet, Text } from "react-native";

export default function SimpleText({ text, property }) {
  return <Text style={[styles.text, styles[property]]}>{text}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Inter-Regular",
    color: "#1a1a1a",
    textAlign: "left",
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
