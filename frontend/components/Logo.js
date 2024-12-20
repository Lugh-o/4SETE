import { StyleSheet, Text, View } from "react-native";

export default function Logo({ ...rest }) {
  return (
    <View {...rest}>
      <Text style={[styles.logo]}>4SETE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    fontSize: 48,
    fontWeight: "700",
    fontFamily: "Westgate",
  },
});
