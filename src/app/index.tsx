import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {

  const [gastos, setGastos] = useState<any[]>([]);

  async function carregarGastos() {

    const dadosSalvos = await AsyncStorage.getItem('gastos');

    if (dadosSalvos !== null) {
      setGastos(JSON.parse(dadosSalvos));
    } else {
      setGastos([]);
    }

  }

  useFocusEffect(
    useCallback(() => {
      carregarGastos();
    }, [])
  );

  let total = 0;

  for (let i = 0; i < gastos.length; i++) {
    total = total + gastos[i].valor;
  }

  async function excluirGasto(id: number) {

  const novaLista = gastos.filter((item) => item.id !== id);

  setGastos(novaLista);

  await AsyncStorage.setItem('gastos', JSON.stringify(novaLista));

}

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Controle de Gastos
      </Text>

      <Text style={styles.total}>
        Total gasto: R$ {total.toFixed(2).replace('.', ',')}
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.push('/cadastro')}
      >
        <Text style={styles.textoBotao}>
          Adicionar Gasto
        </Text>
      </TouchableOpacity>

      <FlatList
        data={gastos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (

          <View style={styles.item}>

            <Text style={styles.descricao}>
              {item.descricao}
            </Text>

            <Text style={styles.valor}>
              R$ {item.valor.toFixed(2).replace('.', ',')}
            </Text>

            <TouchableOpacity
                onPress={() => excluirGasto(item.id)}>
                <Text style={{ color: 'red', fontWeight: 'bold' }}>
                      Excluir
                </Text>
            </TouchableOpacity>

          </View>

        )}
        ListEmptyComponent={
          <Text style={styles.mensagem}>
            Nenhum gasto cadastrado.
          </Text>
        }
      />

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
    marginBottom: 20,
    textAlign: 'center',
  },

  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  botao: {
    backgroundColor: '#219653',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },

  textoBotao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  item: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  descricao: {
    fontSize: 16,
  },

  valor: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  mensagem: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
  },

});