import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";

import DateTimePicker from "@react-native-community/datetimepicker";

import AuthContext from "../../context/AuthContext";
import { logout } from "../../services/AuthService";
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

  const [loja, setLoja] = useState(filme.loja);
  const [valor, setValor] = useState(filme.valor);
  const [observacoes, setObservacoes] = useState(filme.observacoes);
  const [errors, setErrors] = useState({});

  async function handleEdit() {
    try {
      const payload = {
        marca: marca,
        validade: validade,
        modelo: modelo,
        iso: iso,
        data_compra: dataCompra,
        loja: loja,
        valor: valor,
        observacoes: observacoes,
      };

      const response = await FilmeService.update(filme.id, payload);
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao editar filme:", error.message);
    }
  }

  function changeValidade(event, selectedDate) {
    setValidade(selectedDate);
    setShowValidade(false);
  }
  function changeDataCompra(event, selectedDate) {
    setDataCompra(selectedDate);
    setShowDataCompra(false);
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
      <View style={styles.campos}>
        <FormTextField
          label="Marca*"
          value={marca}
          onChangeText={(text) => setMarca(text)}
          errors={errors.marca}
        />
        <FormTextField
          label="Modelo*"
          value={modelo}
          onChangeText={(text) => setModelo(text)}
          errors={errors.modelo}
        />
        <FormTextField
          label="ISO*"
          value={String(iso)}
          inputMode="numeric"
          onChangeText={(text) => setIso(text)}
          errors={errors.iso}
        />

        <SimpleButton
          title={validade.toISOString().split("T")[0]}
          onPress={() => {
            setShowValidade(true);
          }}
          textStyle={styles.buttonTextStyle}
          otherStyle={styles.buttonContainerStyle}
        />
        {showValidade && (
          <DateTimePicker
            testID="validadePicker"
            value={validade}
            mode={"date"}
            is24Hour={true}
            onChange={changeValidade}
          />
        )}

        <SimpleButton
          title={dataCompra.toISOString().split("T")[0]}
          onPress={() => {
            setShowDataCompra(true);
          }}
          textStyle={styles.buttonTextStyle}
          otherStyle={styles.buttonContainerStyle}
        />
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
          onChangeText={(text) => setLoja(text)}
          errors={errors.loja}
        />
        <FormTextField
          label="Valor"
          value={valor}
          onChangeText={(text) => setValor(text)}
          errors={errors.valor}
        />
        <FormTextField
          label="Observações"
          value={observacoes}
          onChangeText={(text) => setObservacoes(text)}
          errors={errors.observacoes}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    width: "100%",
    paddingLeft: 20,
  },
  header: {
    position: "absolute",
    top: 54,
    flexDirection: "row",
    gap: 162.25,
  },
  campos: {
    gap: 24,
    marginTop: 44,
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
