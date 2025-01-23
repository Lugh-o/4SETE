import { View, StyleSheet, Text, ScrollView, Alert } from "react-native";
import React, { useContext, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import AuthContext from "../../context/AuthContext";
import Logo from "../../components/Logo";
import SimpleButton from "../../components/SimpleButton";
import ArrowDropDown from "../../assets/buttonIcons/arrow_drop_down_circle.svg";
import FormTextField from "../../components/FormTextField";
import AddIcon from "../../assets/add_green.svg";
import Navbar from "../../components/Navbar";
import { RevelacaoService } from "../../services/CrudService";

export default function ConcluirRevelacao({ navigation, route }) {
  const { user } = useContext(AuthContext);
  const [observacoes, setObservacoes] = useState("");
  const [imagens, setImagens] = useState([]);
  const [revelacao, setRevelacao] = useState(route.params.revelacao);

  React.useEffect(() => {
    setRevelacao(route.params.revelacao);
  }, [navigation]);

  // Function to open the image picker
  async function addImagem() {
    // Request permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permissão Negada",
        "É necessário permitir acesso à galeria para selecionar imagens."
      );
      return;
    }

    // Open the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false, // Allows cropping/editing
      quality: 1, // Image quality
    });

    if (!result.canceled) {
      const { uri } = result.assets[0]; // URI of the selected image
      const filename = uri.split("/").pop(); // Extract filename from URI

      // Fetch the image as a Blob
      const response = await fetch(uri);
      const binary = await response.blob();

      // Add the image to the state
      setImagens((prevImagens) => [...prevImagens, { uri, filename, binary }]);
    }
  }

  async function concluirRevelacao() {
    const payload = {
      imagens: imagens,
      observacoes: observacoes,
    };
    try {
      const response = await RevelacaoService.finish(revelacao, payload);
      // console.log(response.data);

      // navigation.goBack();
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Logo style={styles.logo} />
        <View style={styles.header}>
          <SimpleButton
            title="Página principal"
            onPress={() => navigation.navigate("Home")}
            icon={
              <ArrowDropDown width={16} height={16} transform="rotate(270)" />
            }
            buttonStyle={styles.botaoHome}
            textStyle={styles.textoHome}
          />
          <Text style={styles.title}>Concluir Revelação</Text>
        </View>
        <FormTextField
          label="Anotações"
          value={observacoes}
          onChangeText={(text) => setObservacoes(text)}
          height={190}
          multiline={true}
        />
        <SimpleButton
          title="Adicionar Imagem"
          onPress={addImagem}
          buttonStyle={styles.botaoAddEtapa}
          textStyle={styles.textoAddEtapa}
          rightIcon={
            <AddIcon width={16} height={16} style={{ alignSelf: "center" }} />
          }
          otherStyle={styles.otherStyle}
        />
        <ScrollView style={styles.scroll}>
          {imagens.map((img, index) => (
            <View key={index} style={styles.imageContainer}>
              <Text>{img.filename}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <SimpleButton
            title={"Concluir Revelacao"}
            onPress={concluirRevelacao}
          />
        </View>
      </View>
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "column",
    marginTop: 44,
    width: 300,
    gap: 20,
  },

  otherStyle: {
    gap: 12,
  },
  botaoAddEtapa: {
    backgroundColor: 0,
    margin: 0,
    padding: 12,
    marginTop: 12,
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  scroll: {
    height: 200,
    width: 300,
    gap: 12,
  },
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
    gap: 66,
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
  imageContainer: {
    marginTop: 12,
    alignItems: "center",
  },
});
