import axios from "axios"
import  axiosInstance  from "../../../apicalls/axiosinstance"

const URL = '/api/users'

const createUser = async ( userData ) => {
    const response = await axios.post('https://themarketplace.onrender.com/api/users', userData)
    return response.data
}

const loginUser = async ( userData ) => {
    const response = await axios.post('https://themarketplace.onrender.com/api/users/login', userData)
    return response.data
}

const getCurrentUser = async ( ) => {
    const response = await axiosInstance.get(URL);
    return response.data;
}

const getAllUsers = async ( ) => {
    const response = await axiosInstance.get(`${URL}/all`);
    return response.data;
}

const updateUserStatus = async (payload) => {
    const response = await axiosInstance.put(`${URL}/update-status/${payload.id}`, payload)
    return response.data
}

const userService = {
    createUser,
    loginUser,
    getCurrentUser,
    getAllUsers,
    updateUserStatus
}

export default userService;