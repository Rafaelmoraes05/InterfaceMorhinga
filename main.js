import { preencherGrafico } from "./gauge.js";

// Dados de exemplo
const listData = {
    temperatura: 21.24,
    umidade: 51.58,
    pressao: 1021.52,
    luz: 5031,
    gas: 7.3,
    ar: 11.7,
    velocidadeVento: 0,
    voltagem: 0.8719999,
    rpm: 0
};

preencherGrafico(listData);