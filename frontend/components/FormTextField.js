import { View, TextInput, StyleSheet, Text } from "react-native";

export default function FormTextField({ label, errors = [], ...rest }) {
  return (
    <View >
      <TextInput
        style={[styles.input]}
        autoCapitalize="none"
        placeholder={label}
        {...rest}
      />
      {errors.map((err) => {
        return (
          <Text key={err} style={styles.error}>
            {err}
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "#E90000",
    marginTop: 2,
    fontSize: 10,
    fontFamily: "Inter-Regular",
    textAlign: "left",
    flex: 1,
    alignSelf: "stretch",
    marginLeft: 16,
  },
  input: {
    backgroundColor: "#fff",
    width: 300,
    height: 48,
    padding: 12,
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#1a1a1a",
    textAlign: "left",
  },
});
