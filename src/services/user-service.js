import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://192.168.18.197:8080/api/admin/";

const getAll = () =>{
    return axios.get(API_URL, {headers: authHeader()})
}

const updateUser = (req) => {
    return axios.put(API_URL + req.id, JSON.stringify(req), {headers: authHeader()})
}

const createUser = (req) => {
    return axios.post(API_URL, JSON.stringify(req), {headers: authHeader()})
}

const deleteUser = (id) => {
    return axios.delete(API_URL + id, {headers: authHeader()})
}

export default { getAll, updateUser, createUser, deleteUser };