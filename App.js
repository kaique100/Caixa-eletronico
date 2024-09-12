import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';


const cedulas = [50, 20, 10];
const resulto = [];

const App = () => {
  const [quantidade, setQuantidade] = useState('');
  const [contas, setContas] = useState([]);

  const calculateContas = () => {
    const valor = parseInt(quantidade);
    if (isNaN(valor) || valor % 10 !== 0 || valor <= 0) {
      alert("Por favor, insira um valor válido que seja múltiplo de 10.");
      return;
    } 

    let restante = valor;

    cedulas.forEach(cedula => {
      const count = Math.floor(restante / cedula);
      if (count > 0) {
        resulto.push({ cedula, count });
        restante -= count * cedula;
      }
    });

    setContas(resulto);
  };

  return (
    <View style={styles.container}>
     
      <Text style={styles.subTitle}>Digite o valor a ser retirado(multiplo de 10):</Text>
      <TextInput
        style={styles.input}
        placeholder="0"
        keyboardType="numeric"
        valor={quantidade}
        onChangeText={setQuantidade}
      />
      <Button style={styles.buttonCalc} title="CALCULAR RETIRADAS" onPress={calculateContas} />
      <FlatList
        data={contas}
        keyExtractor={(item) => item.cedula.toString()}
        renderItem={({ item }) => (
          <Text style={styles.cedulaTexto}>
            R${item.cedula}: {item.count} nota(s)  
          </Text>
        )}
        ListVaziaComponent={<Text style={styles.TextoVazio}>Nenhuma cédula necessária.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 20
  },
  subTitle:{
    fontSize: 18,
    marginBottom: 20,
    marginTop: 40
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '25%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonCalc: {
    marginBottom: 100
  },
  cedulaTexto: {
    fontSize: 18,
    marginTop: 20
  },
  TextoVazio: {
    fontSize: 16,
    color: 'gray',
  },
});

export default App;