import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function SecondaryButton({ title, ...rest }) {
  return (
    <View style={[styles.simples]}>
      <TouchableOpacity style={styles.button} {...rest}>
        <Text style={styles.buttonTitle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonTitle: {
    textAlign: "center",
  },
  simples: {
    height: 42,
    padding: 12,
    borderColor: "#1a1a1a",
    borderWidth: 1,
  },
});
