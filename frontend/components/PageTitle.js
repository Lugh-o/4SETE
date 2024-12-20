import { StyleSheet, Text, View } from "react-native";

export default function PageTitle({ label, ...rest }) {
  return (
    <View {...rest}>
      <Text style={[styles.text]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: "Inter-Regular",
    textAlign: "center",
  },
});
