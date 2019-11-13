import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

 
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Monitoramento de luminosidade',
    backgroundColor: 'black',
  };

  constructor(props){
    super(props);
    this.state = {
      isLoading: true
    };
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

  buscaDados = () => {
    
    var resposta
    this.setState({ isLoading: true})
    return fetch(
        `enderecoDaAPI`
      )
        .then(res => res.json())
        .then(resJson => {
          resposta = resJson;
          this.setState({
              isLoading: false,
              nivelLuminosidade: resposta.nivelLuminosidade,
              valorObservado: resposta.valorObservado,
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
      {this.state.isLoading ? <Text> Carregando... </Text> : <Text>  </Text>}
      <Text>Nível de luminosidade: {this.state.nivelLuminosidade}</Text>
      <Text>Valor lido pelo sensor: {this.state.valorObservado}</Text>
      </View>
    );
  }
}