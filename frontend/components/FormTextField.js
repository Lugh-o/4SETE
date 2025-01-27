import { View, TextInput, StyleSheet, Text } from "react-native";

export default function FormTextField({
  label,
  errors = [],
  showTopLabel = null,
  ...rest
}) {
  return (
    <View>
      {!(showTopLabel === null || showTopLabel == "") && (
        <Text style={[styles.inputLabel]}>{label}</Text>
      )}
      <TextInput
        style={[styles.input]}
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={255}
        autoComplete="off"
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
  inputLabel: {
    position: "absolute",
    zIndex: 100,
    left: 12,
    top: -5,
    backgroundColor: "#FFF",
    fontSize: 10,
    fontFamily: "Inter-Regular",
    color: "#666",
  },
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
