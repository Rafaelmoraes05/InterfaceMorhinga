import {findByPlacaIdAndDateRange} from './controller.js';

document.querySelector("#formTemporal").addEventListener("click", async ()=>{
    const graficos = document.querySelector("#charts");
    graficos.innerHTML="";
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    console.log(id);
    const startDate = document.querySelector("#startDate");
    const endDate = document.querySelector("#endDate");
    console.log(startDate.value)
    const startDateISO = new Date(startDate.value).toISOString();
    const endDateISO = new Date(endDate.value).toISOString();
    console.log(startDateISO)

    const data = await findByPlacaIdAndDateRange(id, startDateISO, endDateISO);


    //let dado1 = data.map(item=>[item.dataHoraString, item.temperatura]);
    let dados = data.map(item => {
        let [time, date] = item.dataHoraString.split(' ');
        let [dia, mes, ano] = date.split('/');

        let dataFormatada = new Date(ano, mes-1, dia, ...time.split(':'));
        return [dataFormatada, item.temperatura, item.pressao, item.luminosidade, item.cO2, item.qualidadeDoAr, item.velocidadeDoVento, item.voltagem, item.rpm]

    });

    gerarGraficoDygraph(dados);
    
    //const labels = data.map(item => item.dataHoraString);
    //let dados = data.map(item => item.temperatura);
    //gerarGrafico('charts', 'Temperatura', ' °C', labels, dados);
    // dados = data.map(item => item.umidade);
    // gerarGrafico('charts', 'Umidade', ' %', labels, dados);
    // dados = data.map(item => item.pressao);
    // gerarGrafico('charts', 'Pressão', ' mmHG', labels, dados);
    // dados = data.map(item => item.luminosidade);
    // gerarGrafico('charts', 'Luminosidade', ' lx', labels, dados);
    // dados = data.map(item => item.cO2);
    // gerarGrafico('charts', 'CO2', ' ppm', labels, dados);
    // dados = data.map(item => item.qualidadeDoAr);
    // gerarGrafico('charts', 'Qualidade do Ar', '', labels, dados);
    // dados = data.map(item => item.velocidadeDoVento);
    // gerarGrafico('charts', 'Velocidade do Vento', ' km/h', labels, dados);
    // dados = data.map(item => item.voltagem);
    // gerarGrafico('charts', 'Voltagem', ' V', labels, dados);
    // dados = data.map(item => item.rpm);
    // gerarGrafico('charts', 'RPM', '', labels, dados);
});


//charts js
function gerarGrafico(div, tipoDado, unidade, labels, dados){   

    const ctx = document.createElement('canvas');
    document.getElementById(div).appendChild(ctx);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: tipoDado,
                data: dados,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Data/Hora'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: `${tipoDado} ${unidade}`
                    }
                }
            }
        }
    });
}


//dygraph
function gerarGraficoDygraph(dados){
    const chart = document.querySelector('#charts');
    const labels = [
        "Temperatura °C",
        "Pressão hPa",
        "Luminosidade lux",
        "CO2 ppm",
        "Qualidade do Ar AQI",
        "Velocidade Do Vento km/h",
        "Voltagem V",
        "RPM"
    ]
    for(let i = 1; i<dados[0].length;i++){
        const div = document.createElement('div');
        div.setAttribute('class', 'graficoDygraph');
        const d = dados.map(item=>[item[0], item[i]]);
        const g = new Dygraph(div, d, {
            legend: 'always',
            title: labels[i-1],
            showRoller: true,
            ylabel: labels[i-1]
        });
        chart.appendChild(div);
    }
   
}