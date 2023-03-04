import axios from 'axios'

let api;

function startApi(){
    let ipPort = window.location.host;
    const ip = ipPort.split(":")[0] +":8090";
    api = axios.create({
        baseURL: `http://${ip}/api/v1`
    });

    api.interceptors.response.use((res) => {
        return res.data;
    });
}


startApi();

// Axios functions to call different APIS
export const fetchPools = () => {return api.get('/pool/all')}
export const fetchLfas = () => {return api.get('/lfa/licenses')}
export const fetchLfaNames = () => {return api.get('/lfa')}
export const consumeLicense = (payload) => {return api.put('/lfa/consume', payload)}
export const generateSubLicense = (payload) => {return api.post('/license/lfa', payload)}
export const uploadFile = (payload) => {return api.post('/license', payload, { headers: {"Content-Type": "multipart/form-data"} })}