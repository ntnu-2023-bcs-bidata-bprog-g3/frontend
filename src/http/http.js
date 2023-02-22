import axios from 'axios'

let api;

function startApi(){
    api = axios.create({
        baseURL: '/api/v1'
    });

    api.interceptors.response.use((res) => {
        return res.data;
    });
}


startApi();

// Axios functions to call different APIS
export const fetchPools = (payload) => {return api.get('/pool/all', payload)}
export const uploadFile = (payload) => {return api.get('/license', payload)}