import { allReadPlaca, findLatestDataByPlacaId } from "./controller.js";
import { preencherGrafico } from "./gauge.js";

// Inicializa o mapa
var map = L.map('map').setView([-8.059694, -34.951917], 9);


// Adiciona o tile layer ao mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Adiciona um marcador nas coordenadas fornecidas e chama seus dados a cada 60 segundos
allReadPlaca().then(placas => {
    placas.forEach(element => {
        let marker = L.marker([element.latitude, element.longitude]).addTo(map).on('click', async function(e){
            const placaOutPutData = await findLatestDataByPlacaId(element.id);
                preencherGrafico(placaOutPutData);
            setTimeout(async ()=>{
                const placaOutPutData = await findLatestDataByPlacaId(element.id);
                preencherGrafico(placaOutPutData);
            }, 60000);                        
            const mapBox = document.querySelector("#map");
            const charts = document.querySelector("#charts");
            mapBox.style.width = "30%"; 
            charts.style.display = "flex"; 
            charts.style.width = "70%";
            map.invalidateSize();            
        });
        marker.bindPopup(`${element.latitude} ${element.longitude}`).openPopup();
    });
}).catch(error => console.error("Erro ao carregar placas:", error));

