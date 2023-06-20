import axiosInstance from "../../../apicalls/axiosinstance"

const URL = '/api/products'

const addProduct = async ( data ) => {
    const response = await axiosInstance.post(URL, data)
    return response.data
}

const getAllProducts = async (data ) => {
    const response = await axiosInstance.post(`${URL}/getProducts`, data)
    return response.data
}

const getSingleProduct = async (id) => {
    const response = await axiosInstance.get(`${URL}/${id}`)
    return response.data
}

const editProduct = async (payload) => {
    const response = await axiosInstance.put(`${URL}/${payload.id}`, payload)
    return response.data
}

const deleteProduct = async (id) => {
    const response = await axiosInstance.delete(`${URL}/${id}`)
    return response.data
}

const uploadProductImage = async (payload) => {
    const response = await axiosInstance.post(`${URL}/upload`, payload)
    return response.data
}

const updateProductStatus = async (payload) => {
    const response = await axiosInstance.put(`${URL}/update-status/${payload.id}`, payload)
    return response.data
}

const productService = {
    addProduct,
    getAllProducts,
    editProduct,
    deleteProduct,
    uploadProductImage,
    updateProductStatus,
    getSingleProduct
}
export default productService