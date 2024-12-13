import {
    findByPlacaIdAndDateRange,
    processDataPlacaAndDateRange,
} from "./controller.js";
import { construirTables } from "./tables.js";

document.querySelector("#formTemporal").addEventListener("click", async () => {
    const graficos = document.querySelector("#charts");
    graficos.innerHTML = "";
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const startDate = document.querySelector("#startDate");
    const endDate = document.querySelector("#endDate");
    const startDateISO = new Date(startDate.value).toISOString();
    const endDateISO = new Date(endDate.value).toISOString();

    const data = await findByPlacaIdAndDateRange(id, startDateISO, endDateISO);
    const dataProcess = await processDataPlacaAndDateRange(
        id,
        startDateISO,
        endDateISO
    );
    construirTables(dataProcess);

    let dados = data.map((item) => {
        let [time, date] = item.dataHoraString.split(" ");
        let [dia, mes, ano] = date.split("/");

        let dataFormatada = new Date(ano, mes - 1, dia, ...time.split(":"));
        return [
            dataFormatada,
            item.temperatura,
            item.pressao,
            item.luminosidade,
            item.cO2,
            item.qualidadeDoAr,
            item.velocidadeDoVento,
            item.voltagem,
            item.rpm,
            item.ph,
            item.pluviometria
        ];
    });

    // Aguarda o próximo ciclo de renderização
    setTimeout(() => {
        gerarGraficoDygraph(dados);
    }, 0);
});

function gerarGraficoDygraph(dados) {
    const chart = document.querySelector("#charts");
    const labels = [
        "Temperatura °C",
        "Pressão hPa",
        "Luminosidade lux",
        "CO2 ppm",
        "Qualidade do Ar AQI",
        "Velocidade Do Vento km/h",
        "Voltagem V",
        "RPM",
        "pH",
        "Pluviometria mm"
    ];

    // Definir dimensões explícitas para os contêineres
    const style = document.createElement('style');
    style.textContent = `
        .graficoDygraph {
            width: 100%;
            height: 300px;
            margin-bottom: 20px;
        }
    `;
    document.head.appendChild(style);

    for (let i = 1; i < dados[0].length; i++) {
        const div = document.createElement("div");
        div.setAttribute("class", "graficoDygraph");
        chart.appendChild(div);

        // Aguarda o DOM ser atualizado
        requestAnimationFrame(() => {
            const d = dados.map((item) => [item[0], item[i]]);
            new Dygraph(div, d, {
                legend: "always",
                title: labels[i - 1],
                showRoller: true,
                ylabel: labels[i - 1],
                width: div.offsetWidth,
                height: div.offsetHeight,
                // Adiciona um callback para redimensionamento
                resizeCallback: function(dygraph, pixels) {
                    dygraph.resize();
                }
            });
        });
    }
}