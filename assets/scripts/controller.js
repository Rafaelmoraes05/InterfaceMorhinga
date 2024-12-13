const api = "https://spring-moringa.onrender.com";

//retorna todas as placas do banco
export async function allReadPlaca() {
    const url = api + "/api/allReadPlaca";

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
            },    
        });
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }    
}

//retorna a última leitura de uma determinada placa
export async function findLatestDataByPlacaId(id) {
    const url = api + `/api/findLatestDataByPlacaId/${id}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
            },    
        });
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }    
}

//retorna uma lista de leituras dentro de um intervalo temporal para determinada placa
export async function findByPlacaIdAndDateRange(id, startDate, endDate) {
    const url = api + `/api/findByPlacaIdAndDateRange/${id}/${startDate}/${endDate}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },    
        });
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }    
}

//retorna os dados processados de uma leitura dentro de um intervalo temporal para determinada placa
export async function processDataPlacaAndDateRange(id, startDate, endDate){
    const url = api + `/api/processDataPlacaAndDateRange/${id}/${startDate}/${endDate}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },    
        });
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }  
}
