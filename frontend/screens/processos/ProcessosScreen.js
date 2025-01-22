import { View, StyleSheet, Text, ScrollView } from "react-native";
import React, { useState, useContext } from "react";

import AuthContext from "../../context/AuthContext";

import Logo from "../../components/Logo";
import SimpleButton from "../../components/SimpleButton";
import Navbar from "../../components/Navbar";
import ListCard from "../../components/ListCard";

import ArrowDropDown from "../../assets/buttonIcons/arrow_drop_down_circle.svg";
import Edit from "../../assets/buttonIcons/border_color.svg";
import Delete from "../../assets/buttonIcons/delete.svg";
import { ProcessoService } from "../../services/CrudService";
import SplashScreen from "../SplashScreen";
import AddIcon from "../../assets/add_green.svg";

export default function ProcessosScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);
  const [processoList, setProcessoList] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLoading(true);
      fetchProcessos();
    });
    return unsubscribe; // Garante que o listener será limpo ao desmontar o componente
  }, [navigation]);

  async function fetchProcessos() {
    try {
      const response = await ProcessoService.getAll();
      setProcessoList(response.data);
    } catch (error) {
      console.error("Erro ao buscar processos:", error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      setLoading(true);
      const response = await ProcessoService.delete(id);
      fetchProcessos();
    } catch (error) {
      console.error("Erro ao deletar processo:", error.message);
    }
  }

  if (loading) return <SplashScreen />;

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
          <Text style={styles.title}>Processos</Text>
        </View>

        <ScrollView style={styles.scroll}>
          {Array.isArray(processoList) &&
            processoList.map((processo) => (
              <ListCard
                key={processo.id}
                bigText={processo.nome}
                mediumText={
                  processo.quantidade_usos +
                  " Revelações, Validade: " +
                  processo.validade.substring(0, 10)
                }
                icon2={<Edit width={16} height={16} />}
                icon3={<Delete />}
                borderColor={"greenBorder"}
                style={{ marginBottom: 12 }}
                onDelete={() => handleDelete(processo.id)}
                onEdit={() =>
                  navigation.navigate("ProcessosEditForm", {
                    processo: processo,
                  })
                }
              />
            ))}
          <SimpleButton
            title="Adicionar Processo"
            onPress={() => {
              navigation.navigate("ProcessosCreateForm");
            }}
            buttonStyle={styles.botaoAddEtapa}
            textStyle={styles.textoAddEtapa}
            rightIcon={
              <AddIcon width={16} height={16} style={{ alignSelf: "center" }} />
            }
            otherStyle={styles.otherStyle}
          />
        </ScrollView>
      </View>
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  otherStyle: {
    gap: 12,
  },
  botaoAddEtapa: {
    backgroundColor: 0,
    margin: 0,
    padding: 12,
    marginTop: 24,
    marginRight: 20,
    alignSelf: "flex-end",
  },
  textoAddEtapa: {
    margin: 0,
    padding: 0,
    color: "#006A04",
  },
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
    gap: 125,
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
