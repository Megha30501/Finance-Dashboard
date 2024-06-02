import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/transactions'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}
const remove = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
};
const update = async (id, updatedObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, updatedObject);
    return response.data;
};
export default{getAll,create,remove, update}