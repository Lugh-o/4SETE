import { View, StyleSheet, Text } from "react-native";
import React, { useContext, useState } from "react";

import AuthContext from "../context/AuthContext";

import Logo from "../components/Logo";
import SimpleButton from "../components/SimpleButton";

import ArrowDropDown from "../assets/buttonIcons/arrow_drop_down_circle.svg";
import StopWatch from "../components/StopWatch";
import { ProcessoService } from "../services/CrudService";

export default function CronometroScreen({ navigation, route }) {
  const { user, setUser } = useContext(AuthContext);
  const [currentEtapa, setCurrentEtapa] = useState(0);
  const [etapas, setEtapas] = useState(route.params.etapas);
  const [processo, setProcesso] = useState(route.params.processo);
  const [revelacao, setRevelacao] = useState(route.params.revelacao);

  React.useEffect(()=>{
    setEtapas(route.params.etapas);
    setProcesso(route.params.processo);
    setRevelacao(route.params.revelacao);
    
  },[navigation])

  // const etapas = route.params.etapas;
  // const processo = route.params.processo;
  // const revelacao = route.params.revelacao;  

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Logo style={styles.logo} />
        <View style={styles.header}>
          <SimpleButton
            title="Página principal"
            onPress={() => {
              navigation.navigate("Home");
            }}
            icon={
              <ArrowDropDown width={16} height={16} transform="rotate(270)" />
            }
            buttonStyle={styles.botaoHome}
            textStyle={styles.textoHome}
          />
          <Text style={styles.title}>Revelando</Text>
        </View>
        <StopWatch
          nome={etapas[currentEtapa]["nome"]}
          duracao={etapas[currentEtapa]["duracao"]}
          onCountdownEnd={() => {
            if (currentEtapa + 1 < etapas.length) {
              setCurrentEtapa(currentEtapa + 1);
            } else {
              ProcessoService.increment(processo);
              navigation.navigate("RevelacoesConcluir", {
                revelacao: revelacao,
              });
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    position: "absolute",
    top: 54,
    height: "100% - 150",
  },
  scroll: {
    height: 594,
    gap: 12,
  },
  headerContainer: {},
  title: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: "#1a1a1a",
    margin: 0,
    padding: 0,
  },
  header: {
    flexDirection: "row",
    alignSelf: "center",
    gap: 129,
    padding: 0,
    margin: 0,
    marginTop: 12,
  },
  botaoHome: {
    backgroundColor: 0,
    padding: 0,
    margin: 0,
  },
  textoHome: {
    padding: 0,
    color: "#006A04",
    fontSize: 14,
    fontFamily: "Inter-Regular",
    marginLeft: 12,
    marginRight: 8,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  text: {
    textAlign: "center",
  },
  logo: {
    alignSelf: "center",
  },
});
