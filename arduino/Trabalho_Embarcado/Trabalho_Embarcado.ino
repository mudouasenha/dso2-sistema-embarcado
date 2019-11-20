//Inclusâo da biblioteca de conexao por wifi e cliente HTTP
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>

//Define os pinos dos componentes usados
#define pinoSensorLuminosidade A0
#define pinoLedGroove D7

//Define os limites de luminosidade a serem usados 
int limiteEscuro = 400;

//Cria outras variaveis a serem usadads
int valorObservado;
char* nivelLuminosidade;

const char* ssid = "Marcia";
const char* password = "99094129";

HTTPClient http;




void setup() {
  Serial.begin(9600);
  delay(100);
  
  // Configura o led para saída
  pinMode(pinoLedGroove, OUTPUT);

  // Configura o sensor de luminosidade como entrada
  pinMode(pinoSensorLuminosidade, INPUT);

  //Inicia conexão com a rede wifi
  Serial.println();
  Serial.println();
  Serial.print("Conectando a rede ");
  Serial.println(ssid);
 
  WiFi.begin(ssid, password);

  //Espera o wifi conectar
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  
  // Retorna o IP do WiFi
  Serial.println("");
  Serial.println("WiFi conectado");
  Serial.print("Endereco de ip: ");
  Serial.println(WiFi.localIP());
 
}


void loop() {
  
  delay(1000);
  
  //Recebe o valor do sensor de luminosidade
  valorObservado = analogRead(pinoSensorLuminosidade);
  
  //Verifica o nível 
  if(valorObservado < limiteEscuro){
    nivelLuminosidade = "ESCURO";
    //Acende  o LED sólido
    digitalWrite(pinoLedGroove, HIGH);
  }else{
    nivelLuminosidade = "CLARO";
    //Não acende o LED
    digitalWrite(pinoLedGroove, LOW);
        }
        
  //Montando objeto JSON
  //char JSONMessage[] = " {\"valor\": valorObservado, \"nivel\": nivelLuminosidade}"; 
  StaticJsonBuffer<300> JSONBuffer;
  JsonObject& JsonEncoder = JSONBuffer.createObject();
  JsonEncoder["valor"] = valorObservado;   
  JsonEncoder["nivel"] = nivelLuminosidade;    
  char JSONmessageBuffer[300];
  JsonEncoder.prettyPrintTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));
  Serial.println(JSONmessageBuffer);
  if(WiFi.status() == WL_CONNECTED){
    http.begin("http://mudouasenha.matheus.mtg.vms.ufsc.br/dado");
    http.addHeader("Content-Type", "application/json");
    http.addHeader("Accept", "application/json");

    int resultadoHttp = http.POST(JSONmessageBuffer);
    String payload = http.getString();

    Serial.print("Resultado do POST: ");
    Serial.println(resultadoHttp);
    Serial.println(payload);

    
   
    http.end();
    }else{
      Serial.println("Erro na conexão WiFi");
      }

}
