import { View, StyleSheet } from "react-native";

import Rolo from "../assets/Rolo.svg";
import Filme1 from "../assets/filme/Filme1.svg";
import Filme2 from "../assets/filme/Filme2.svg";
import Filme3 from "../assets/filme/Filme3.svg";
import Filme4 from "../assets/filme/Filme4.svg";
import React from "react";

export default function SplashScreen() {
  const [state, setState] = React.useState(0);

  React.useEffect(() => {
    // Configura o intervalo para atualizar o estado
    const interval = setInterval(() => {
      setState((prev) => (prev + 1) % 4); // Incrementa e reseta para 0 ao atingir 3
    }, 300);

    // Limpa o intervalo quando o componente desmonta
    return () => clearInterval(interval);
  }, []);

  const renderFilme = () => {
    switch (state) {
      case 0:
        return <Filme1 style={[styles.load, styles.filme]}/>;
      case 1:
        return <Filme2 style={[styles.load, styles.filme]}/>;
      case 2:
        return <Filme3 style={[styles.load, styles.filme]}/>;
      case 3:
        return <Filme4 style={[styles.load, styles.filme]}/>;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderFilme()}
      <Rolo style={[styles.load, styles.rolo]} />
    </View>
  );
}

const styles = StyleSheet.create({
  load: {
    position: "absolute",
  },
  rolo: {
  },
  filme: {
    top: 421,
    left: 210
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
