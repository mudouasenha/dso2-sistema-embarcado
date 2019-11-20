import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

 
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Monitoramento de luminosidade',
    backgroundColor: 'black',
  };

  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
     
     this.buscaDados()
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  } 

  componentDidUpdate(){
    this.buscaDados()
  }

  buscaDados = () => {
    
    var resposta
    return fetch(
        `http://mudouasenha.matheus.mtg.vms.ufsc.br/dados`
      )
        .then(res => res.json())
        .then(resJson => {
          resposta = resJson;
          this.setState({
              nivelLuminosidade: resposta.nivel,
              valorObservado: resposta.valor,
            }, () => {});
        })
        .catch(error => {
          console.error(error);
        });
    }
  
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
      <Text>Nível de luminosidade: {this.state.nivelLuminosidade}</Text>
      <Text>Valor lido pelo sensor: {this.state.valorObservado}</Text>
      </View>
    );
  }
}