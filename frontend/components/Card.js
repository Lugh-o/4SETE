import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Icon from "../assets/placeholder.svg";
import SimpleText from "./SimpleText";

export default function Card({ ...rest }) {
  return (
    <View {...rest}>
      <View style={styles.container}>
        <Icon width={32} height={32} />
        <View style={styles.textContainer}>
          <SimpleText text="placeholder" />
          <SimpleText text="placeholder" />
        </View>

        <View style={styles.iconContainer}>
          <Icon width={16} height={16} />
          <Icon width={16} height={16} />
        </View>
        <Icon width={24} height={24} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    padding: 12,
    backgroundColor: "red",
    height: 47
  },
  textContainer: {
    flexDirection: "column",
    gap: 8,
  },
  iconContainer: {
    flexDirection: "column",
    gap: 12,
  },
});
