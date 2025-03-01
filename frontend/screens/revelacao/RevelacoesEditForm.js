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
import Delete from "../../assets/buttonIcons/delete.svg";
import AddIconGreen from "../../assets/add_green.svg";
import Move from "../../assets/Move.svg";
import {
  CameraService,
  FilmeService,
  RevelacaoService,
  ProcessoService,
} from "../../services/CrudService";
import TextButton from "../../components/TextButton";
import SplashScreen from "../SplashScreen";

export default function RevelacoesEditForm({ navigation, route }) {
  const revelacao = route.params.revelacao;

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
  const [customEtapas, setCustomEtapas] = useState(revelacao.revelacao_etapas);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLoading(true);
      fetchFilmes();
      fetchCameras();
      fetchProcessos();
    });
    return unsubscribe;
  }, [navigation]);

  async function fetchFilmes() {
    try {
      const response = await FilmeService.getAll();
      setFilmeList(response.data);

      var filmeDropdownData = [];
      for (let element of response.data) {
        if (element.id == revelacao.filme[0].id) {
          setFilme(response.data.indexOf(element));
        }

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
        if (element.id == revelacao.camera[0].id) {
          setCamera(response.data.indexOf(element));
        }

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
        if (element.id == revelacao.processo[0].id) {
          setProcesso(response.data.indexOf(element));
        }
        processoDropdownData.push({
          label: element.nome,
          value: response.data.indexOf(element),
        });
      }
      setProcessoDropdownList(processoDropdownData);
    } catch (error) {
      console.error("Erro ao buscar processos:", error.message);
    } finally {
      setLoading(false);
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
      posicao: customEtapas.length + 1,
    });
    setCustomEtapas(newEtapaList);
  }

  async function editRevelacao(goBack) {
    try {
      const filmeId =
        filmeList[filme] == undefined ? "" : filmeList[filme]["id"];
      const cameraId =
        cameraList[camera] == undefined ? "" : cameraList[camera]["id"];
      const processoId =
        processoList[processo] == undefined ? "" : processoList[processo]["id"];

      await RevelacaoService.update(revelacao.id, {
        filme_id: filmeId,
        camera_id: cameraId,
        processo_id: processoId,
        revelacao_etapas: customEtapas,
      });

      if (goBack) navigation.goBack();
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  }

  function changeDictionaryValueByKey(array, index, key, value) {
    var newArray = JSON.parse(JSON.stringify(array));
    newArray[index][key] = value;
    return newArray;
  }

  function comecarRevelacao() {
    editRevelacao(false);
    navigation.navigate("CronometroScreen", {
      etapas: customEtapas,
      processo: processoList[processo]["id"],
      revelacao: revelacao.id,
    });
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
          <Text style={styles.title}>Editar revelação</Text>
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
          <Text style={styles.error}>{errors.filme_id}</Text>

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
          <Text style={styles.error}>{errors.camera_id}</Text>

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
          <Text style={styles.error}>{errors.processo_id}</Text>

          <View style={styles.allStepContainer}>
            {Array.isArray(customEtapas) &&
              customEtapas.map((etapa, index) => (
                <View style={styles.stepContainer} key={index}>
                  <Text style={styles.stepTitle}>{etapa.nome}</Text>
                  <View style={styles.stepBody}>
                    <TouchableOpacity>
                      <Move width={16} height={16} style={styles.moveIcon} />
                    </TouchableOpacity>

                    <FormTextField
                      label="Tempo da etapa*"
                      defaultValue={String(etapa.duracao)}
                      inputMode="decimal"
                      onChangeText={(text) =>
                        setCustomEtapas(
                          changeDictionaryValueByKey(
                            customEtapas,
                            index,
                            "duracao",
                            text
                          )
                        )
                      }
                      errors={errors[`revelacao_etapas.${index}.duracao`]}
                    />
                    {etapa.posicao == 1 ? (
                      <></>
                    ) : (
                      <TouchableOpacity
                        onPress={() => handleStepDeletion(index)}
                      >
                        <Delete style={styles.moveIcon} />
                      </TouchableOpacity>
                    )}
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
              rightIcon={
                <AddIconGreen
                  width={16}
                  height={16}
                  style={{ alignSelf: "center" }}
                />
              }
              otherStyle={styles.otherStyle}
            />
          )}
        </ScrollView>
        <SimpleButton title="Começar a revelar" onPress={comecarRevelacao} />
        <TextButton
          title="Salvar para depois"
          onPress={() => editRevelacao(true)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  moveIcon: {
    alignSelf: "center",
    marginBottom: 24,
  },
  error: {
    color: "#E90000",
    marginTop: 2,
    fontSize: 10,
    fontFamily: "Inter-Regular",
    textAlign: "left",
    flex: 1,
    alignSelf: "stretch",
    marginLeft: 16,
  },
  otherStyle: {
    gap: 12,
  },
  botaoAddEtapa: {
    backgroundColor: 0,
    margin: 0,
    padding: 12,
    marginBottom: 24,
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
    marginTop: 24,
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
