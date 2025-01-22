import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useContext, useState } from "react";

import DateTimePicker from "@react-native-community/datetimepicker";

import AuthContext from "../../context/AuthContext";
import { logout } from "../../services/AuthService";
import SimpleButton from "../../components/SimpleButton";
import FormTextField from "../../components/FormTextField";

import AddIcon from "../../assets/buttonIcons/add_2.svg";
import { FilmeService } from "../../services/CrudService";

export default function FilmesCreateForm({ navigation }) {
  const { user, setUser } = useContext(AuthContext);
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [iso, setIso] = useState("");

  const [validade, setValidade] = useState(new Date(Date.now()));
  const [showValidade, setShowValidade] = useState(false);
  const [dataCompra, setDataCompra] = useState(new Date(Date.now()));
  const [showDataCompra, setShowDataCompra] = useState(false);

  const [loja, setLoja] = useState("");
  const [valor, setValor] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [errors, setErrors] = useState({});

  async function handleLogout() {
    await logout();
    setUser(null);
  }

  async function postFilme() {
    const filme = {
      marca: marca,
      validade: validade,
      modelo: modelo,
      iso: iso,
      data_compra: dataCompra,
      loja: loja,
      valor: valor,
      observacoes: observacoes,
    };

    try {
      const response = await FilmeService.create(filme);

      navigation.goBack();
    } catch (error) {
      console.error(error.response?.data || error.message);
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
          title="Adicionar Filme"
          onPress={postFilme}
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
