import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";

import AuthContext from "../context/AuthContext";
import { logout } from "../services/AuthService";
import Logo from "../components/Logo";

import Card from "../components/Card";
import PlaceholderIcon from "../assets/placeholder.svg";
import AddIcon from "../assets/buttonIcons/add_2.svg";
import CameraRollIcon from "../assets/buttonIcons/camera_roll.svg";
import LightbulbIcon from "../assets/buttonIcons/emoji_objects.svg";
import ScienceIcon from "../assets/buttonIcons/science.svg";
import LinkedCameraIcon from "../assets/buttonIcons/linked_camera.svg";
import PhotoLibraryIcon from "../assets/buttonIcons/photo_library.svg";

import Navbar from "../components/Navbar";

export default function HomeScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);

  async function handleLogout() {
    await logout();
    setUser(null);
  }

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
        mediumText={"0 filmes"}
        borderColor={"greenBorder"}
        onPress={() => {
          navigation.navigate("FilmesList");
        }}
      />
      <Card
        icon1={<LinkedCameraIcon width={32} height={32} />}
        // icon2={<PlaceholderIcon width={16} height={16} />}
        // icon3={<PlaceholderIcon width={16} height={16} />}
        icon4={<AddIcon width={24} height={24} />}
        bigText={"Minhas Câmeras"}
        mediumText={"0 câmeras"}
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
        bigText={"Meus Procesos"}
        mediumText={"0 processos"}
        borderColor={"greenBorder"}
        onPress={() => {
          navigation.navigate("ProcessosList");
        }}
      />
      <Card
        icon1={<PhotoLibraryIcon width={32} height={32} />}
        // icon2={<PlaceholderIcon width={16} height={16} />}
        // icon3={<PlaceholderIcon width={16} height={16} />}
        icon4={<AddIcon width={24} height={24} />}
        bigText={"Minhas Revelações"}
        mediumText={"0 revelações"}
        borderColor={"greenBorder"}
      />
      <Card
        icon1={<LightbulbIcon width={32} height={32} />}
        // icon2={<PlaceholderIcon width={16} height={16} />}
        // icon3={<PlaceholderIcon width={16} height={16} />}
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
