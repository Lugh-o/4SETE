import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useContext, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import AuthContext from "../../context/AuthContext";
import SimpleButton from "../../components/SimpleButton";
import FormTextField from "../../components/FormTextField";
import Delete from "../../assets/buttonIcons/delete.svg";
import AddIcon from "../../assets/buttonIcons/add_2.svg";
import AddIconGreen from "../../assets/add_green.svg";
import { ProcessoService } from "../../services/CrudService";

export default function ProcessosCreateForm({ navigation }) {
  const { user, setUser } = useContext(AuthContext);
  const [nome, setNome] = useState("");
  const [marca, setMarca] = useState("");

  const [validade, setValidade] = useState(new Date(Date.now()));
  const [showValidade, setShowValidade] = useState(false);
  const [validadeSelected, setValidadeSelected] = useState(false);

  const [dataCompra, setDataCompra] = useState(new Date(Date.now()));
  const [showDataCompra, setShowDataCompra] = useState(false);
  const [dataCompraSelected, setDataCompraSelected] = useState(false);

  const [loja, setLoja] = useState("");
  const [valor, setValor] = useState("");
  const [quantidadeUsos, setQuantidadeUsos] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [errors, setErrors] = useState({});

  const [etapaList, setEtapaLista] = useState([
    {
      nome: "",
      duracao: "",
      processo_id: "",
      posicao: 1,
    },
  ]);

  async function addEtapa() {
    var newEtapaList = [...etapaList];
    newEtapaList.push({
      nome: "",
      duracao: "",
      processo_id: "",
      posicao: etapaList.length + 1,
    });
    setEtapaLista(newEtapaList);
  }

  function handleStepDeletion(index) {
    var newEtapaList = [...etapaList];
    newEtapaList.splice(index, 1);
    setEtapaLista(newEtapaList);
  }

  async function postProcesso() {
    try {
      await ProcessoService.create({
        nome: nome,
        marca: marca,
        data_compra: dataCompra,
        validade: validade,
        loja: loja,
        valor: valor,
        quantidade_usos: quantidadeUsos,
        observacoes: observacoes,
        processo_etapas: etapaList,
      });
      navigation.goBack();
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  }

  function changeValidade(event, selectedDate) {
    setValidade(selectedDate);
    setShowValidade(false);
    setValidadeSelected(true);
  }

  function changeDataCompra(event, selectedDate) {
    setDataCompra(selectedDate);
    setShowDataCompra(false);
    setDataCompraSelected(true);
  }

  function changeDictionaryValueByKey(array, index, key, value) {
    var newArray = JSON.parse(JSON.stringify(array));
    newArray[index][key] = value;
    return newArray;
  }

  function stringToSec(string) {
    const [minutes, seconds] = string.split(":");
    const totalSeconds = +minutes * 60 + +seconds;
    return totalSeconds;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AddIcon width={32} height={32} transform="rotate(45)" />
        </TouchableOpacity>
        <SimpleButton
          title="Adicionar Processo"
          onPress={postProcesso}
          buttonStyle={styles.botaoAddProcesso}
          textStyle={styles.textoAddProcesso}
        />
      </View>
      <ScrollView>
        <Text style={styles.title}>Informações Básicas</Text>
        <View style={styles.campos}>
          <FormTextField
            label="Nome*"
            value={nome}
            showTopLabel={nome}
            onChangeText={(text) => setNome(text)}
            errors={errors.nome}
          />
          <FormTextField
            label="Marca"
            value={marca}
            showTopLabel={marca}
            onChangeText={(text) => setMarca(text)}
            errors={errors.marca}
          />

          <View style={styles.datePickerGap}>
            {dataCompraSelected && (
              <Text style={[styles.inputLabel]}>Data de Compra</Text>
            )}
            <SimpleButton
              title={
                dataCompraSelected
                  ? dataCompra.toISOString().split("T")[0]
                  : "Data de Compra"
              }
              onPress={() => {
                setShowDataCompra(true);
              }}
              textStyle={styles.buttonTextStyle}
              otherStyle={styles.buttonContainerStyle}
            />
          </View>
          {showDataCompra && (
            <DateTimePicker
              testID="dataCompraPicker"
              value={dataCompra}
              mode={"date"}
              is24Hour={true}
              onChange={changeDataCompra}
            />
          )}

          <View style={styles.datePickerGap}>
            {validadeSelected && (
              <Text style={[styles.inputLabel]}>Data de Validade</Text>
            )}
            <SimpleButton
              title={
                validadeSelected
                  ? validade.toISOString().split("T")[0]
                  : "Data de Validade"
              }
              onPress={() => {
                setShowValidade(true);
              }}
              textStyle={styles.buttonTextStyle}
              otherStyle={styles.buttonContainerStyle}
            />
          </View>
          {showValidade && (
            <DateTimePicker
              testID="validadePicker"
              value={validade}
              mode={"date"}
              is24Hour={true}
              onChange={changeValidade}
            />
          )}

          <FormTextField
            label="Loja"
            value={loja}
            showTopLabel={loja}
            onChangeText={(text) => setLoja(text)}
            errors={errors.loja}
          />
          <FormTextField
            label="Valor"
            value={valor}
            showTopLabel={valor}
            isValor={true}
            inputMode="decimal"
            onChangeText={(text) => setValor(text)}
            errors={errors.valor}
          />
          <FormTextField
            label="Quantidade de usos estimada"
            value={quantidadeUsos}
            showTopLabel={quantidadeUsos}
            inputMode="decimal"
            onChangeText={(text) => setQuantidadeUsos(text)}
            errors={errors.quantidade_usos}
          />
          <FormTextField
            label="Observações"
            value={observacoes}
            showTopLabel={observacoes}
            onChangeText={(text) => setObservacoes(text)}
            errors={errors.observacoes}
          />
        </View>
        <Text style={[styles.title, styles.steps]}>Etapas do processo*</Text>
        <Text style={styles.stepText}>
          O processo deve possuir pelo menos uma etapa. Você pode adicionar ou
          remover etapas ao criar uma revelação, mas essas alterações não irão
          refletir nas informações salvas neste processo.
        </Text>
        {Array.isArray(etapaList) &&
          etapaList.map((etapa, index) => (
            <View style={styles.stepContainer} key={index}>
              <View style={styles.stepheader}>
                <Text style={[styles.stepTitle]}>
                  {etapa.nome === "" ? "Nome da etapa" : etapaList[index].nome}
                </Text>

                {etapa.posicao == 1 ? (
                  <></>
                ) : (
                  <TouchableOpacity onPress={() => handleStepDeletion(index)}>
                    <Delete />
                  </TouchableOpacity>
                )}
              </View>
              <FormTextField
                label="Nome da etapa*"
                onChangeText={(text) =>
                  setEtapaLista(
                    changeDictionaryValueByKey(etapaList, index, "nome", text)
                  )
                }
                errors={errors[`processo_etapas.${index}.nome`]}
              />

              <FormTextField
                label="Tempo da etapa*"
                inputMode="decimal"
                onChangeText={(text) =>
                  setEtapaLista(
                    changeDictionaryValueByKey(
                      etapaList,
                      index,
                      "duracao",
                      text
                    )
                  )
                }
                errors={errors[`processo_etapas.${index}.duracao`]}
              />
            </View>
          ))}
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  datePickerGap: {
    marginBottom: 24,
  },
  inputLabel: {
    position: "absolute",
    zIndex: 100,
    left: 12,
    top: -5,
    backgroundColor: "#FFF",
    fontSize: 10,
    fontFamily: "Inter-Regular",
    color: "#666",
  },
  buttonTextStyle: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#1a1a1a",
  },
  buttonContainerStyle: {
    justifyContent: "left",
  },
  stepheader: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    width: 300,
  },
  botaoAddProcesso: {
    backgroundColor: 0,
    margin: 0,
    padding: 12,
    alignSelf: "flex-end",
  },
  textoAddProcesso: {
    color: "#006A04",
  },
  stepContainer: {
    // gap: 12,
    marginTop: 24,
  },
  stepTitle: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#1a1a1a",
    width: 284,
    marginBottom: 12,
  },
  stepText: {
    marginTop: 13,
    width: 300,
    fontSize: 10,
    fontFamily: "Inter-Regular",
    color: "#1a1a1a",
    textAlign: "left",
  },
  steps: {
    marginTop: 45,
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
  },
  textoAddEtapa: {
    margin: 0,
    padding: 0,
    color: "#006A04",
  },
  title: {
    fontSize: 18,
    fontFamily: "Inter-Regular",
    color: "#1a1a1a",
    textAlign: "left",
    width: "100%",
  },
  header: {
    marginTop: 54,
    flexDirection: "row",
    gap: 136.75,
  },
  campos: {
    marginTop: 45,
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
});
