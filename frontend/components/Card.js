import { StyleSheet, View } from "react-native";
import SimpleText from "./SimpleText";

export default function Card({
  icon1,
  icon2,
  icon3,
  icon4,
  bigText,
  mediumText,
  borderColor,
  ...rest
}) {
  return (
    <View {...rest}>
      <View style={[styles.container, styles[borderColor]]}>
        {icon1}
        <View style={styles.textContainer}>
          <SimpleText text={bigText} property={"big"} />
          <SimpleText text={mediumText} property={"medium"} />
        </View>

        <View style={styles.iconContainer}>
          {icon2 || <View style={styles.blankIcon}></View>}
          {icon3 || <View style={styles.blankIcon}></View>}
        </View>
        {icon4}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  blankIcon: {
    width: 16,
    height: 16,
  },
  container: {
    borderStyle: "solid",
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    padding: 12,
    height: 100,
    width: 300,
  },
  textContainer: {
    flexDirection: "column",
    gap: 8,
    width: 180,
  },
  iconContainer: {
    flexDirection: "column",
    gap: 12,
  },
  greenBorder: {
    borderColor: "#006a04",
  },
});
