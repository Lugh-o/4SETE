import { StyleSheet, View, TouchableOpacity } from "react-native";
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
    <TouchableOpacity {...rest}>
      <View style={[styles.container, styles[borderColor]]}>
        {icon1}
        <View style={styles.textContainer}>
          <SimpleText text={bigText} property={"big"} />
          <SimpleText text={mediumText} property={"medium"} />
        </View>
        {icon4}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  container: {
    borderStyle: "solid",
    borderWidth: 1,
    flexDirection: "row",
    // gap: 12,
    alignItems: "center",
    padding: 12,
    // paddingRight: 37,
    height: 100,
    marginLeft: 20,
    marginRight: 20,
    width: 350,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    rowGap: 8,
    marginLeft: 12,
    // paddingRight: 24?,
    // marginRight: -12,
    // flexGrow: 1,
    width: 246,
    // width: "100%",
  },
  iconContainer: {
    flexDirection: "column",
    rowGap: 12,
    // margin: 12,
    // flexGrow: 1,
    // width: "100%",
  },
  greenBorder: {
    borderColor: "#006a04",
  },
});
