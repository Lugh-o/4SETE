import * as React from "react";
import { SafeAreaView, View, TextInput, StyleSheet, Text } from "react-native";

export default function FormTextField({ label, errors = [], ...rest }) {
  return (
    <SafeAreaView style={[styles.inputFlexBox]}>
      <SafeAreaView style={[styles.input1, styles.inputFlexBox]}>
        <View style={[styles.input1, styles.inputFlexBox]}>
          <TextInput
            style={[styles.input, styles.placeholder]}
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
      </SafeAreaView>
    </SafeAreaView>
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
    marginLeft: 16

  },
  inputFlexBox: {
    flex: 1,
    alignSelf: "stretch",
  },
  placeholder: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#1a1a1a",
    textAlign: "left",
  },
  input1: {
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#fff",
    width: "100%",
    height: 48,
    justifyContent: "center",
    padding: 12,
  },
});
