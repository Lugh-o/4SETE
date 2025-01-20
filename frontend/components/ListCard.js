import { StyleSheet, View, TouchableOpacity } from "react-native";
import SimpleText from "./SimpleText";

export default function ListCard({
  icon2,
  icon3,
  bigText,
  mediumText,
  borderColor,
  onEdit,
  onDelete,
  ...rest
}) {
  return (
    <View {...rest}>
      <View style={[styles.container, styles[borderColor]]}>
        <View style={styles.textContainer}>
          <SimpleText text={bigText} property={"big"} />
          <SimpleText text={mediumText} property={"medium"} />
        </View>

        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={onEdit}>{icon2}</TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>{icon3}</TouchableOpacity>
        </View>
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
    // gap: 12,
    alignItems: "center",
    padding: 12,
    paddingRight: 37,
    height: 100,
    marginLeft: 20,
    marginRight: 20,
    // width: 300,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    rowGap: 8,
    // flexGrow: 1,
    // width: 180,
    width: "100%",
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
