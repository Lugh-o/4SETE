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
import { logout } from "../../services/AuthService";
import SimpleButton from "../../components/SimpleButton";
import FormTextField from "../../components/FormTextField";

import AddIcon from "../../assets/buttonIcons/add_2.svg";
import { EtapaService, ProcessoService } from "../../services/CrudService";

export default function ProcessosCreateForm({ navigation }) {
  const { user, setUser } = useContext(AuthContext);
  const [nome, setNome] = React.useState("");
  const [marca, setMarca] = React.useState("");
  const [dataCompra, setDataCompra] = React.useState(new Date(Date.now()));
  const [validade, setValidade] = React.useState(new Date(Date.now()));
  const [showValidade, setShowValidade] = React.useState(false);
  const [showDataCompra, setShowDataCompra] = React.useState(false);
  const [loja, setLoja] = React.useState("");
  const [valor, setValor] = React.useState("");
  const [quantidadeUsos, setQuantidadeUsos] = React.useState("");
  const [observacoes, setObservacoes] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const [etapaList, setEtapaLista] = React.useState([
    {
      nome: "",
      duracao: "",
      processo_id: "",
      posicao: 1,
    },
  ]);

  async function handleLogout() {
    await logout();
    setUser(null);
  }

  async function addEtapa() {
    var newEtapaList = etapaList;
    newEtapaList.push({
      nome: "",
      duracao: "",
      processo_id: "",
      posicao: etapaList.length,
    });
    setEtapaLista(newEtapaList);
  }

  async function postProcesso() {
    const processo = {
      nome: nome,
      marca: marca,
      data_compra: dataCompra,
      validade: validade,
      loja: loja,
      valor: valor,
      quantidade_usos: quantidadeUsos,
      observacoes: observacoes,
      etapas: etapaList,
    };
    console.log(processo);
    

    try {
      const response = await ProcessoService.create(processo);

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
            onChangeText={(text) => setNome(text)}
            errors={errors.nome}
          />
          <FormTextField
            label="Marca*"
            value={marca}
            onChangeText={(text) => setMarca(text)}
            errors={errors.marca}
          />

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
            label="Quantidade de usos estimada*"
            value={quantidadeUsos}
            onChangeText={(text) => setQuantidadeUsos(text)}
            errors={errors.observacoes}
          />
          <FormTextField
            label="Observações*"
            value={observacoes}
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
              <Text style={[styles.stepTitle]}>
                {etapaList[0].nome === ""
                  ? "Nome da etapa"
                  : etapaList[index].nome}
              </Text>
              <FormTextField
                label="Nome da etapa*"
                // value={etapa.nome}
                onChangeText={(text) => (etapaList[index].nome = text)}
              />
              <FormTextField
                label="Tempo da etapa"
                // value={etapaList[index].duracao}
                onChangeText={(text) => (etapaList[index].duracao = text)}
              />
            </View>
          ))}

        <SimpleButton
          title="Adicionar Etapa"
          onPress={addEtapa}
          buttonStyle={styles.botaoAddEtapa}
          textStyle={styles.textoAddEtapa}
          rightIcon={<AddIcon width={16} height={16} />}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    gap: 12,
    marginTop: 24,
  },
  stepTitle: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#1a1a1a",
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
    gap: 24,
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
