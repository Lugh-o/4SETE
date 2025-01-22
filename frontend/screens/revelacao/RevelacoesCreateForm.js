import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";

import { Dropdown } from "react-native-element-dropdown";
import AuthContext from "../../context/AuthContext";
import SimpleButton from "../../components/SimpleButton";
import FormTextField from "../../components/FormTextField";
import Logo from "../../components/Logo";
import ArrowDropDown from "../../assets/buttonIcons/arrow_drop_down_circle.svg";
import Navbar from "../../components/Navbar";
import Delete from "../../assets/buttonIcons/delete.svg";

import AddIcon from "../../assets/buttonIcons/add_2.svg";
import {
  CameraService,
  FilmeService,
  RevelacaoService,
  ProcessoService,
} from "../../services/CrudService";
import TextButton from "../../components/TextButton";
import SplashScreen from "../SplashScreen";


export default function RevelacoesCreateForm({ navigation }) {
  const { user, setUser } = useContext(AuthContext);

  const [filmeList, setFilmeList] = useState([]);
  const [cameraList, setCameraList] = useState([]);
  const [processoList, setProcessoList] = useState([]);

  const [filmeDropdownList, setFilmeDropdownList] = useState([]);
  const [cameraDropdownList, setCameraDropdownList] = useState([]);
  const [processoDropdownList, setProcessoDropdownList] = useState([]);

  const [filme, setFilme] = useState("");
  const [camera, setCamera] = useState("");
  const [processo, setProcesso] = useState("");
  const [customEtapas, setCustomEtapas] = useState([]);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLoading(true);
      fetchFilmes();
      fetchCameras();
      fetchProcessos();
    });
  }, [navigation]);

  async function fetchFilmes() {
    try {
      const response = await FilmeService.getAll();
      setFilmeList(response.data);

      var filmeDropdownData = [];
      for (let element of response.data) {
        filmeDropdownData.push({
          label: element.marca + " " + element.modelo + " " + element.iso,
          value: response.data.indexOf(element),
        });
      }
      setFilmeDropdownList(filmeDropdownData);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error.message);
    }
  }

  async function fetchCameras() {
    try {
      const response = await CameraService.getAll();
      setCameraList(response.data);

      var cameraDropdownData = [];
      for (let element of response.data) {
        cameraDropdownData.push({
          label: element.marca + " " + element.modelo,
          value: response.data.indexOf(element),
        });
      }
      setCameraDropdownList(cameraDropdownData);
    } catch (error) {
      console.error("Erro ao buscar cameras:", error.message);
    }
  }

  async function fetchProcessos() {
    try {
      const response = await ProcessoService.getAll();
      setProcessoList(response.data);

      var processoDropdownData = [];
      for (let element of response.data) {
        processoDropdownData.push({
          label: element.nome,
          value: response.data.indexOf(element),
        });
      }
      setProcessoDropdownList(processoDropdownData);
    } catch (error) {
      console.error("Erro ao buscar processos:", error.message);
    } finally {
      setLoading(false)
    }
  }

  function handleStepDeletion(index) {
    var newEtapaList = [...customEtapas];
    newEtapaList.splice(index, 1);
    setCustomEtapas(newEtapaList);
  }

  async function addEtapa() {
    var newEtapaList = [...customEtapas];
    newEtapaList.push({
      nome: "etapa",
      duracao: "",
      processo_id: "",
      posicao: customEtapas.length,
    });
    setCustomEtapas(newEtapaList);
  }

  async function postRevelacao(goBack) {
    const revelacao = {
      filme_id: filmeList[filme]["id"],
      camera_id: cameraList[camera]["id"],
      processo_id: processoList[processo]["id"],
      revelacao_etapas: customEtapas,
    };

    try {
      const response = await RevelacaoService.create(revelacao);

      if (goBack) navigation.goBack();
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  }

  function changeDictionaryValueByKey(array, index, key, value) {
    var newArray = JSON.parse(JSON.stringify(array));
    newArray[index][key] = value;
    return newArray;
  }

  function comecarRevelacao() {
    postRevelacao(false);
    navigation.navigate("CronometroScreen", {
      etapas: customEtapas,
      processo: processoList[processo]["id"],
    });
  }
  if(loading) return <SplashScreen/>

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
          <Text style={styles.title}>Adicionando revelação</Text>
        </View>

        <ScrollView style={styles.scroll}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={filmeDropdownList}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Filme"
            searchPlaceholder="Search..."
            value={filme}
            onChange={(item) => {
              setFilme(item.value);
            }}
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={cameraDropdownList}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Câmera"
            searchPlaceholder="Search..."
            value={camera}
            onChange={(item) => {
              setCamera(item.value);
            }}
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={processoDropdownList}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Processo"
            searchPlaceholder="Search..."
            value={processo}
            onChange={(item) => {
              setProcesso(item.value);
              setCustomEtapas(processoList[item.value].processo_etapa);
            }}
          />
          <View style={styles.allStepContainer}>
            {Array.isArray(customEtapas) &&
              customEtapas.map((etapa, index) => (
                <View style={styles.stepContainer} key={index}>
                  <Text style={styles.stepTitle}>{etapa.nome}</Text>
                  <View style={styles.stepBody}>
                    <TouchableOpacity onPress={() => handleStepDeletion(index)}>
                      <Delete width={16} height={16} />
                    </TouchableOpacity>

                    <FormTextField
                      label="Tempo da etapa"
                      defaultValue={String(etapa.duracao)}
                      onChangeText={(text) =>
                        setCustomEtapas(
                          changeDictionaryValueByKey(
                            customEtapas,
                            index,
                            "duracao",
                            text == "" ? etapa.duracao : text
                          )
                        )
                      }
                    />
                    <TouchableOpacity onPress={() => handleStepDeletion(index)}>
                      <Delete width={16} height={16} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
          </View>
          {processo !== "" && (
            <SimpleButton
              title="Adicionar Etapa"
              onPress={addEtapa}
              buttonStyle={styles.botaoAddEtapa}
              textStyle={styles.textoAddEtapa}
              rightIcon={<AddIcon width={16} height={16} />}
            />
          )}

          <SimpleButton title="Começar a revelar" onPress={comecarRevelacao} />
          <TextButton
            title="Salvar para depois"
            onPress={() => postRevelacao(true)}
          />
        </ScrollView>
      </View>
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  botaoAddEtapa: {
    backgroundColor: 0,
    margin: 0,
    padding: 12,
    marginTop: 24,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
  },
  textoAddEtapa: {
    margin: 0,
    padding: 0,
    color: "#006A04",
  },
  allStepContainer: {
    gap: 24,
  },
  stepTitle: {
    position: "absolute",
    zIndex: 100,
    left: 40,
    top: -5,
    backgroundColor: "#FFF",
    fontSize: 10,
    fontFamily: "Inter-Regular",
    color: "#666",
  },
  stepContainer: {
    width: 350,
    alignSelf: "center",
  },
  stepBody: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    width: 350,
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#1a1a1a",
    textAlign: "left",
    padding: 12,
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#1a1a1a",
    textAlign: "left",
    padding: 12,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#1a1a1a",
    textAlign: "left",
    padding: 12,
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
    gap: 53,
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
