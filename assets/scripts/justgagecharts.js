let mostradorTemperatura;
let mostradorUmidadade;
let mostradorPressao;
let mostradorLuz;
let mostradorGas;
let mostradorAr;
let mostradorVelocidadeVento;
let mostradorVoltagem;
let mostradorRpm;

export function preencherJustGageCharts(data){

    //temperatura
    document.querySelector("#graficoTemperatura").innerHTML="";
    mostradorTemperatura= new JustGage({
        id: "graficoTemperatura",
        value: data.temperatura,
        min: 0,
        max: 50,
        title: "Temperatura °C",
        refreshAnimation: true,
        relativeGaugeSize: true      
    });
    
    //umidade
    document.querySelector("#graficoUmidade").innerHTML="";
    mostradorUmidadade = new JustGage({
        id: "graficoUmidade",
        value: data.umidade,
        min: 0,
        max: 100,
        title: "Umidade %",
        refreshAnimation: true,
        relativeGaugeSize: true      
    });

    //pressão
    document.querySelector("#graficoPressao").innerHTML="";
    mostradorPressao= new JustGage({
        id: "graficoPressao",
        value: data.pressao,
        min: 900,
        max: 1100,
        title: "Pressão hPa",
        refreshAnimation: true,
        relativeGaugeSize: true      
    });

    //luz
    document.querySelector("#graficoLuz").innerHTML="";
    mostradorLuz= new JustGage({
        id: "graficoLuz",
        value: data.luminosidade,
        min: 0,
        max: 100000,
        title: "Luminosidade lux",
        refreshAnimation: true,
        relativeGaugeSize: true      
    });

    //co2
    document.querySelector("#graficoGas").innerHTML="";
    mostradorGas= new JustGage({
        id: "graficoGas",
        value: data.cO2,
        min: 0,
        max: 1000,
        title: "CO2 ppm",
        refreshAnimation: true,
        relativeGaugeSize: true      
    });

    //qualidade do ar
    document.querySelector("#graficoAr").innerHTML="";
    mostradorAr= new JustGage({
        id: "graficoAr",
        value: data.qualidadeDoAr,
        min: 0,
        max: 500,
        title: "Qualidade do Ar AQI",
        refreshAnimation: true,
        relativeGaugeSize: true      
    });

    //velocidade do vento
    document.querySelector("#graficoVelocidadeDoVento").innerHTML="";
    mostradorVelocidadeVento= new JustGage({
        id: "graficoVelocidadeDoVento",
        value: data.velocidadeDoVento,
        min: 0,
        max: 100,
        title: "Velocidade Do Vento km/h",
        refreshAnimation: true,
        relativeGaugeSize: true      
    });

    //voltagem
    document.querySelector("#graficoVoltagem").innerHTML="";
    mostradorVoltagem= new JustGage({
        id: "graficoVoltagem",
        value: data.voltagem,
        min: 0,
        max: 240,
        title: "Voltagem V",
        refreshAnimation: true,
        relativeGaugeSize: true      
    });

    //RPM
    document.querySelector("#graficoRpm").innerHTML="";
    mostradorRpm= new JustGage({
        id: "graficoRpm",
        value: data.rpm,
        min: 0,
        max: 10000,
        title: "RPM",
        refreshAnimation: true,
        relativeGaugeSize: true      
    });

}