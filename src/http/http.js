import axios from 'axios'

let api;

function startApi(){
    api = axios.create({
        baseURL: 'http://localhost:8090/api/v1'
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
export const generateSubLicense = (payload) => {return api.post('/license/lfa', payload)}
export const uploadFile = (payload) => {return api.post('/license', payload, { headers: {"Content-Type": "multipart/form-data"} })}