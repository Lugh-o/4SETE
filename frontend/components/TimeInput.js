import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

const TimeInput = ({
  label,
  value: propValue,
  errors = [],
  onChangeText,
  ...rest
}) => {
  const [value, setValue] = useState(propValue || "");

  // Atualiza o valor interno quando o valor controlado muda
  React.useEffect(() => {
    setValue(propValue || "");
  }, [propValue]);

  const getSecondsFromHHMMSS = (value) => {
    const [str1, str2, str3] = value.split(":");

    const val1 = Number(str1);
    const val2 = Number(str2);
    const val3 = Number(str3);

    if (!isNaN(val1) && isNaN(val2) && isNaN(val3)) {
      return val1;
    }

    if (!isNaN(val1) && !isNaN(val2) && isNaN(val3)) {
      return val1 * 60 + val2;
    }

    if (!isNaN(val1) && !isNaN(val2) && !isNaN(val3)) {
      return val1 * 60 * 60 + val2 * 60 + val3;
    }

    return 0;
  };

  const toHHMMSS = (secs) => {
    const secNum = parseInt(secs.toString(), 10);
    const hours = Math.floor(secNum / 3600);
    const minutes = Math.floor(secNum / 60) % 60;
    const seconds = secNum % 60;

    return [hours, minutes, seconds]
      .map((val) => (val < 10 ? `0${val}` : val))
      .filter((val, index) => val !== "00" || index > 0)
      .join(":")
      .replace(/^0/, "");
  };

  const handleChangeText = (text) => {
    setValue(text);
    if (onChangeText) {
      onChangeText(text);
    }
  };

  const handleBlur = () => {
    let seconds = Math.max(0, getSecondsFromHHMMSS(value));

    if (seconds > 3599) {
      seconds = 3599;
    }

    const time = toHHMMSS(seconds);
    setValue(time);
    if (onChangeText) {
      onChangeText(time);
    }
  };

  return (
    <View>
      <TextInput
        style={[styles.input]}
        value={value}
        onChangeText={handleChangeText}
        onBlur={handleBlur}
        placeholder={label}
        keyboardType="numeric"
        {...rest}
      />
      {errors.map((err) => (
        <Text key={err} style={styles.error}>
          {err}
        </Text>
      ))}
    </View>
  );
};

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

export default TimeInput;
