import { allReadPlaca, findLatestDataByPlacaId } from "./controller.js";
import { preencherGrafico } from "./gauge.js";
import { preencherJustGageCharts } from "./justgagecharts.js"

// Inicializa o mapa
var map = L.map("map").setView([-8.059694, -34.951917], 9);

// Adiciona o tile layer ao mapa
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Adiciona um marcador nas coordenadas fornecidas e chama seus dados a cada 60 segundos
allReadPlaca()
  .then((placas) => {
    placas.forEach((element) => {
      let marker = L.marker([element.latitude, element.longitude])
        .addTo(map)
        .on("click", async function (e) {
          const placaOutPutData = await findLatestDataByPlacaId(element.id);
          //preencherGrafico(placaOutPutData);
          preencherJustGageCharts(placaOutPutData);
          setTimeout(async () => {
            const placaOutPutData = await findLatestDataByPlacaId(element.id);
            preencherJustGageCharts(placaOutPutData);
            //preencherGrafico(placaOutPutData);
          }, 60000);
          const mapBox = document.querySelector("#map");
          const puxador = document.querySelector("#puxador");
          const charts = document.querySelector("#charts");
          const historico = document.querySelector("#linkHistorico"); 
          historico.href = `historico.html?id=${element.id}`;
          puxador.style.display = "flex";
          historico.style.display = "block";
          mapBox.style.width = "30%";
          charts.style.display = "flex";
          charts.style.width = "70%";
          map.invalidateSize();
        });
      marker.bindPopup(`${element.latitude} ${element.longitude}`).openPopup();
    });
  })
  .catch((error) => console.error("Erro ao carregar placas:", error));

document.querySelector("#puxador").addEventListener("click", () => {
  const mapBox = document.querySelector("#map");
  const puxador = document.querySelector("#puxador");
  const charts = document.querySelector("#charts");
  const historico = document.querySelector("#historico");
  puxador.style.display = "none";
  historico.style.display = "none";
  mapBox.style.width = "100%";
  charts.style.display = "none";
  charts.style.width = "0%";
  map.invalidateSize();
});
