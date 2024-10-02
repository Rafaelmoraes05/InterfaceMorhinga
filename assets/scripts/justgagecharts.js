export function preencherJustGageCharts(data){

    //temperatura
    document.querySelector("#graficoTemperatura").innerHTML="";
    const tempChart= new JustGage({
        id: "graficoTemperatura",
        value: data.temperatura,
        min: 0,
        max: 50,
        title: "Temperatura °C"      
    });

    //temperatura
    document.querySelector("#graficoUmidade").innerHTML="";
    const umiChart= new JustGage({
        id: "graficoUmidade",
        value: data.umidade,
        min: 0,
        max: 100,
        title: "Umidade"      
    });

}