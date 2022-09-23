import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://192.168.18.197:8080/api/product/";

const getAll = () =>{
    return axios.get(API_URL, {headers: authHeader()})
}

const createProduct = (req) => {
    return axios.post(API_URL,JSON.stringify(req), {headers: authHeader()})
}

const updateProduct = (req) => {
    return axios.put(API_URL + req.id, JSON.stringify(req), {headers: authHeader()})
}

const deleteProduct = (req) => {
    return axios.delete(API_URL + req.id, {headers: authHeader()})
}

export default { getAll, createProduct, updateProduct, deleteProduct };