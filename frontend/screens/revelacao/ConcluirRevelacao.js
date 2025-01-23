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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImagens((prevImagens) => [
        ...prevImagens,
        {
          filename: result["assets"][0]["fileName"],
          base64: result["assets"][0]["base64"],
        },
      ]);
    } else {
      alert("You did not select any image.");
    }
  }

  async function concluirRevelacao() {
    const payload = {
      imagens: imagens,
      observacoes: observacoes,
    };
    try {
      const response = await RevelacaoService.finish(revelacao, payload);

      navigation.navigate("Home");
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
