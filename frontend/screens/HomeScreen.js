import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";

import AuthContext from "../context/AuthContext";
import { logout } from "../services/AuthService";
import Logo from "../components/Logo";

import Card from "../components/Card";
import AddIcon from "../assets/buttonIcons/add_2.svg";
import CameraRollIcon from "../assets/buttonIcons/camera_roll.svg";
import LightbulbIcon from "../assets/buttonIcons/emoji_objects.svg";
import ScienceIcon from "../assets/buttonIcons/science.svg";
import LinkedCameraIcon from "../assets/buttonIcons/linked_camera.svg";
import PhotoLibraryIcon from "../assets/buttonIcons/photo_library.svg";

import Navbar from "../components/Navbar";
import {
  CameraService,
  FilmeService,
  RevelacaoService,
  ProcessoService,
} from "../services/CrudService";
import SplashScreen from "./SplashScreen";

export default function HomeScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);

  const [filme, setFilme] = useState("");
  const [camera, setCamera] = useState("");
  const [processo, setProcesso] = useState("");
  const [revelacao, setRevelacao] = useState("");
  const [loading, setLoading] = useState(true);

  async function handleLogout() {
    await logout();
    setUser(null);
  }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLoading(true);
      fetchFilmes();
      fetchCameras();
      fetchProcessos();
      fetchRevelacoes();
    });
    return unsubscribe; // Garante que o listener será limpo ao desmontar o componente
  }, [navigation]);

  async function fetchFilmes() {
    try {
      const response = await FilmeService.getAll();
      setFilme(response.data.length);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error.message);
    }
  }

  async function fetchCameras() {
    try {
      const response = await CameraService.getAll();
      setCamera(response.data.length);
    } catch (error) {
      console.error("Erro ao buscar cameras:", error.message);
    }
  }

  async function fetchProcessos() {
    try {
      const response = await ProcessoService.getAll();
      setProcesso(response.data.length);
    } catch (error) {
      console.error("Erro ao buscar processos:", error.message);
    }
  }

  async function fetchRevelacoes() {
    try {
      const response = await RevelacaoService.getAll();
      setRevelacao(response.data.length);
    } catch (error) {
      console.error("Erro ao buscar revelacoes:", error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <SplashScreen />;

  return (
    <View style={styles.container}>
      <Logo style={styles.logo} />

      <Card
        icon1={<CameraRollIcon width={32} height={32} />}
        icon4={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("FilmesCreateForm");
            }}
          >
            <AddIcon width={24} height={24} />
          </TouchableOpacity>
        }
        bigText={"Meus Filmes"}
        mediumText={filme + " filmes"}
        borderColor={"greenBorder"}
        onPress={() => {
          navigation.navigate("FilmesList");
        }}
      />
      <Card
        icon1={<LinkedCameraIcon width={32} height={32} />}
        icon4={<AddIcon width={24} height={24} />}
        bigText={"Minhas Câmeras"}
        mediumText={camera + " câmeras"}
        borderColor={"greenBorder"}
      />

      <Card
        icon1={<ScienceIcon width={32} height={32} />}
        icon4={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ProcessosCreateForm");
            }}
          >
            <AddIcon width={24} height={24} />
          </TouchableOpacity>
        }
        bigText={"Meus Processos"}
        mediumText={processo + " processos"}
        borderColor={"greenBorder"}
        onPress={() => {
          navigation.navigate("ProcessosList");
        }}
      />
      <Card
        icon1={<PhotoLibraryIcon width={32} height={32} />}
        icon4={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("RevelacoesCreateForm");
            }}
          >
            <AddIcon width={24} height={24} />
          </TouchableOpacity>
        }
        bigText={"Minhas Revelações"}
        mediumText={revelacao + " revelações"}
        borderColor={"greenBorder"}
        onPress={() => {
          navigation.navigate("RevelacoesList");
        }}
      />
      <Card
        icon1={<LightbulbIcon width={32} height={32} />}
        icon4={<AddIcon width={24} height={24} />}
        bigText={"Meus Aprendizados"}
        mediumText={"0 aprendizados"}
        borderColor={"greenBorder"}
      />

      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
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
    position: "absolute",
    top: 54,
  },
});
