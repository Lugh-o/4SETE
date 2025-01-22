import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

export default function SimpleButton({
  title,
  onPress,
  icon,
  rightIcon,
  textStyle,
  buttonStyle,
  ...rest
}) {
  return (
    <View style={[styles.simples, buttonStyle]}>
      <TouchableOpacity onPress={onPress} style={[styles.touchable]}>
        {icon}
        <Text style={[styles.buttonTitle, textStyle]}>{title}{rightIcon}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  touchable: {
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "center"

  },
  buttonTitle: {
    // textAlign: "center",
    // alignItems: "center",
    // justifyContent: "center"
  },
  simples: {
    backgroundColor: "#fff",
    height: 42,
    padding: 12,
  },
});
