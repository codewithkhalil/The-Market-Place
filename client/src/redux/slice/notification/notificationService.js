import axiosInstance from "../../../apicalls/axiosinstance"

const URL = '/api/notifications'

const addNotification = async ( data ) => {
    console.log(data);
    const response = await axiosInstance.post(URL, data)
    return response.data
}

const getNotification = async () => {
    const response = await axiosInstance.get(URL)
    return response.data
}

const deleteNotification = async (id) => {
    const response = await axiosInstance.delete(`${URL}/${id}`)
    return response.data
}

const readAllNotifications = async () => {
    const response = await axiosInstance.put(URL)
    return response.data
}


const notificationService = {
    addNotification,
    getNotification,
    deleteNotification,
    readAllNotifications
}

export default notificationService