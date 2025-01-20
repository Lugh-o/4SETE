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
  const [marca, setMarca] = React.useState(filme.marca);
  const [modelo, setModelo] = React.useState(filme.modelo);
  const [iso, setIso] = React.useState(filme.iso);

  const [validade, setValidade] = React.useState(new Date(filme.validade));
  const [showValidade, setShowValidade] = React.useState(false);
  const [dataCompra, setDataCompra] = React.useState(
    new Date(filme.data_compra)
  );
  const [showDataCompra, setShowDataCompra] = React.useState(false);

  const [loja, setLoja] = React.useState(filme.loja);
  const [valor, setValor] = React.useState(filme.valor);
  const [observacoes, setObservacoes] = React.useState(filme.observacoes);
  const [errors, setErrors] = React.useState({});

  async function handleLogout() {
    await logout();
    setUser(null);
  }

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
          value={iso}
          inputMode="numeric"
          onChangeText={(text) => setIso(text)}
          errors={errors.iso}
        />

        <TouchableOpacity
          onPress={() => {
            setShowValidade(true);
          }}
        >
          <FormTextField
            label="Data de Validade*"
            editable={false}
            value={validade}
            errors={errors.validade}
          />
        </TouchableOpacity>
        {showValidade && (
          <DateTimePicker
            testID="validadePicker"
            value={validade}
            mode={"date"}
            is24Hour={true}
            onChange={changeValidade}
          />
        )}

        <TouchableOpacity
          onPress={() => {
            setShowDataCompra(true);
          }}
        >
          <FormTextField
            label="Data de Compra*"
            editable={false}
            value={dataCompra}
            inputMode="numeric"
            errors={errors.dataCompra}
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
        </TouchableOpacity>
        <FormTextField
          label="Loja*"
          value={loja}
          onChangeText={(text) => setLoja(text)}
          errors={errors.loja}
        />
        <FormTextField
          label="Valor*"
          value={valor}
          onChangeText={(text) => setValor(text)}
          errors={errors.valor}
        />
        <FormTextField
          label="Observações*"
          value={observacoes}
          onChangeText={(text) => setObservacoes(text)}
          errors={errors.observacoes}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
