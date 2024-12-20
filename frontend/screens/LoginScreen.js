import { StyleSheet, View } from "react-native";
import LogInActions from "../components/LogInActions";
import TextButton from "../components/TextButton";
import Logo from "../components/Logo";
import PageTitle from "../components/PageTitle";

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.logIn}>
      <Logo style={styles.logo} />

      <PageTitle style={styles.pageTitle} label="Log In" />

      <View style={styles.actionsView}>
        <LogInActions />

        <TextButton
          title="Não tenho uma conta"
          onPress={() => {
            navigation.navigate("Register");
          }}
        />

        <TextButton
          title="Esqueci a senha"
          onPress={() => {
            navigation.navigate("Forgot Password");
          }}
        />
      </View>

      <TextButton
        style={styles.noCredentialsButton}
        title="Entrar sem credenciais"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  actionsView: {
    position: "absolute",
    top: 337,
    gap: 12,
  },
  noCredentialsButton: {
    top: 726,
    left: 0,
  },
  pageTitle: {
    top: 255,
  },
  logo: {
    alignSelf: "center",
    position: "absolute",
    top: 207,
  },
  logIn: {
    backgroundColor: "#f0f0f0",
    margin: 45,
  },
});
