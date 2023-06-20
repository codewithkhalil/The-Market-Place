import axiosInstance from "../../../apicalls/axiosinstance"

const URL = '/api/bids'

const placeNewBid = async ( data ) => {
    const response = await axiosInstance.post(URL, data)
    return response.data
}

const getAllBids = async ( data ) => {
    const response = await axiosInstance.post(`${URL}/getAll`, data)
    return response.data
}

const bidService = {
    placeNewBid,
    getAllBids
}

export default bidService