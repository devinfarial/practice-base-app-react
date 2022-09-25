import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/menu/";

const getAll = () =>{
    return axios.get(API_URL, {headers: authHeader()})
}

const createMenu = (req) =>{
    return axios.post(API_URL, JSON.stringify(req), {headers: authHeader()})
}

const updateMenu = (req) =>{
    return axios.put(API_URL + req.id, JSON.stringify(req), {headers: authHeader()})
}

const deleteMenu = (req) =>{
    return axios.delete(API_URL + req.id, {headers: authHeader()})
}


export default { getAll, createMenu, updateMenu, deleteMenu }