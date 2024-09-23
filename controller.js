const api = "http://localhost:8080/api"

//buscar lista com todos os objetos placa
export async function allReadPlaca(){
    const url = api+"/allReadPlaca";
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(!response.ok){
            console.log(`Erro: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    }
}


//buscar última entrada de dados para uma placa específica
export async function findLatestDataByPlacaId(id){
    const url = api + `/findLatestDataByPlacaId/${id}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(!response.ok){
            console.log(`Erro: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    }
}

//buscar intervalo temporal para uma placa em específico
export async function findByPlacaIdAndDateRange(id, startDate, endDate){
    const url = api + `/findByPlacaIdAndDateRange/${id}/${startDate}/${endDate}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(!response.ok){
            console.log(`Erro: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    }
}