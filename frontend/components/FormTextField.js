import { View, TextInput, StyleSheet, Text } from "react-native";

export default function FormTextField({
  label,
  errors = [],
  showTopLabel = null,
  isValor = false,
  ...rest
}) {
  return (
    <View style={styles.gap}>
      {!(showTopLabel === null || showTopLabel == "") && (
        <Text style={[styles.inputLabel]}>{label}</Text>
      )}
      {isValor && <Text style={styles.prefix}>R$</Text>}
      <TextInput
        style={[styles.input, isValor && styles.valorPlaceholderPadding]}
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
            {String(err)}
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  gap: {
    marginBottom: 24,
  },
  prefix: {
    position: "absolute",
    zIndex: 100,
    left: 12,
    top: 14,
    backgroundColor: "#FFF",
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#1a1a1a",
  },
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
  valorPlaceholderPadding: {
    paddingLeft: 35,
  },
});
