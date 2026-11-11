import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CadastroGasto() {

  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [erro, setErro] = useState('');

async function salvarGasto() {

  if (descricao === '' || valor === '' || Number(valor.replace(',', '.')) <= 0) {
    setErro('Preencha a descrição e informe um valor maior que zero.');
    return;
  }

  const novoGasto = {
    id: Date.now(),
    descricao: descricao,
    valor: Number(valor.replace(',', '.')),
  };

  const dadosSalvos = await AsyncStorage.getItem('gastos');

  let listaGastos = [];

  if (dadosSalvos !== null) {
    listaGastos = JSON.parse(dadosSalvos);
  }

  listaGastos.push(novoGasto);

  await AsyncStorage.setItem('gastos', JSON.stringify(listaGastos));

  router.back();
}

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Novo Gasto</Text>

      <Text style={styles.label}>Descrição:</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Alimentação"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Valor:</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: 25.50"
        value={valor}
        onChangeText={setValor}
        keyboardType="decimal-pad"
      />

      {erro !== '' && (
        <Text style={styles.erro}>{erro}</Text>
      )}

      <TouchableOpacity
        style={styles.botao}
        onPress={salvarGasto}
      >
        <Text style={styles.textoBotao}>Salvar</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },

  label: {
    fontSize: 16,
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
  },

  erro: {
    color: 'red',
    marginBottom: 15,
    fontSize: 14,
  },

  botao: {
    backgroundColor: '#219653',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },

  textoBotao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});