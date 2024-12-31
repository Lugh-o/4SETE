import { StyleSheet, TouchableOpacity } from "react-native";

export default function NavbarButton({ icon }) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => console.log("teste")}
    >
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {},
});
