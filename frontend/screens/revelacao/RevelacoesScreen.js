import { View, StyleSheet, Text, ScrollView } from "react-native";
import React, { useContext, useState } from "react";

import AuthContext from "../../context/AuthContext";
import { logout } from "../../services/AuthService";

import Logo from "../../components/Logo";
import SimpleButton from "../../components/SimpleButton";
import Navbar from "../../components/Navbar";
import ListCard from "../../components/ListCard";

import ArrowDropDown from "../../assets/buttonIcons/arrow_drop_down_circle.svg";
import Edit from "../../assets/buttonIcons/border_color.svg";
import Delete from "../../assets/buttonIcons/delete.svg";
import { RevelacaoService } from "../../services/CrudService";

export default function RevelacoesScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);
  const [revelacaoList, setRevelacaoList] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchRevelacoes();
    });
  }, [navigation]);

  async function fetchRevelacoes() {
    try {
      const response = await RevelacaoService.getAll();
      setRevelacaoList(response.data);
    } catch (error) {
      console.error("Erro ao buscar revelacoes:", error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      const response = await RevelacaoService.delete(id);
      fetchRevelacoes();
    } catch (error) {
      console.error("Erro ao deletar revelacao:", error.message);
    }
  }

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
          <Text style={styles.title}>Revelações</Text>
        </View>

        <ScrollView style={styles.scroll}>
          {Array.isArray(revelacaoList) &&
            revelacaoList.map((revelacao) => (
              <ListCard
                key={revelacao["id"]}
                bigText={revelacao["filme"][0]["marca"]}
                mediumText={
                  revelacao["camera"][0]["marca"] +
                  " " +
                  revelacao["camera"][0]["modelo"] +
                  " " +
                  revelacao["processo"][0]["nome"]
                }
                icon2={<Edit width={16} height={16} />}
                icon3={<Delete />}
                borderColor={"greenBorder"}
                style={{ marginBottom: 12 }}
                onDelete={() => handleDelete(revelacao["id"])}
                onEdit={() =>
                  navigation.navigate("RevelacoesEditForm", {
                    revelacao: revelacao,
                  })
                }
              />
            ))}
        </ScrollView>
      </View>
      <Navbar />
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
    gap: 163,
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
