import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

export default function SimpleButton({ title, ...rest }) {
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
    backgroundColor: "#fff",
    height: 42,
    padding: 12,
  },
});
