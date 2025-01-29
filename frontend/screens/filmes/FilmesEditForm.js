import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import AuthContext from "../../context/AuthContext";
import SimpleButton from "../../components/SimpleButton";
import FormTextField from "../../components/FormTextField";
import AddIcon from "../../assets/buttonIcons/add_2.svg";
import { FilmeService } from "../../services/CrudService";

export default function FilmesEditForm({ navigation, route }) {
  const filme = route.params.filme;

  const { user, setUser } = useContext(AuthContext);
  const [marca, setMarca] = useState(filme.marca);
  const [modelo, setModelo] = useState(filme.modelo);
  const [iso, setIso] = useState(filme.iso);

  const [validade, setValidade] = useState(new Date(filme.validade));
  const [showValidade, setShowValidade] = useState(false);
  const [dataCompra, setDataCompra] = useState(new Date(filme.data_compra));
  const [showDataCompra, setShowDataCompra] = useState(false);
  const [validadeSelected, setValidadeSelected] = useState(false);
  const [dataCompraSelected, setDataCompraSelected] = useState(false);

  const [loja, setLoja] = useState(filme.loja);
  const [valor, setValor] = useState(filme.valor);
  const [observacoes, setObservacoes] = useState(filme.observacoes);
  const [errors, setErrors] = useState({});

  async function handleEdit() {
    try {
      setErrors({});
      await FilmeService.update(filme.id, {
        marca: marca,
        validade: validade,
        modelo: modelo,
        iso: iso,
        data_compra: dataCompra,
        loja: loja,
        valor: valor,
        observacoes: observacoes,
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
          title="Editar Filme"
          onPress={handleEdit}
          buttonStyle={styles.botaoAddFilme}
          textStyle={styles.textoAddFilme}
        />
      </View>
      <Text style={styles.title}>Informações Básicas</Text>
      <ScrollView style={styles.campos}>
        <FormTextField
          label="Marca*"
          value={marca}
          showTopLabel={marca}
          onChangeText={(text) => setMarca(text)}
          errors={errors.marca}
        />
        <FormTextField
          label="Modelo*"
          value={modelo}
          showTopLabel={modelo}
          onChangeText={(text) => setModelo(text)}
          errors={errors.modelo}
        />
        <FormTextField
          label="ISO*"
          value={String(iso)}
          inputMode="decimal"
          showTopLabel={iso}
          onChangeText={(text) => setIso(text)}
          errors={errors.iso}
        />

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
          label="Observações"
          value={observacoes}
          showTopLabel={observacoes}
          onChangeText={(text) => setObservacoes(text)}
          errors={errors.observacoes}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  datePickerGap: {
    marginBottom: 24
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
  botaoAddFilme: {
    backgroundColor: 0,
  },
  textoAddFilme: {
    color: "#006A04",
  },
  title: {
    fontSize: 18,
    fontFamily: "Inter-Regular",
    color: "#1a1a1a",
    textAlign: "left",
    marginLeft: -125,
  },
  header: {
    marginTop: 54,
    flexDirection: "row",
    gap: 174.75,
  },
  campos: {
    marginTop: 24,
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
