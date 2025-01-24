import { StyleSheet, TouchableOpacity } from "react-native";

export default function NavbarButton({ icon, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {},
});
