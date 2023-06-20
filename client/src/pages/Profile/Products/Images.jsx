import { Button, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { editProduct, getAllProducts, resetProductStatus, uploadProductImage } from '../../../redux/slice/product/productSlice'

const Images = ({selectedProduct,setShowProductForm}) => {
    const [updatedImages, setUpdatedImages] = useState(null)
    const [showPreview, setShowPreview] = useState(true)
    const [images, setImages] = useState(selectedProduct.images)
    const [file, setFile] = useState(null)

    const { isUpdated, uploadSuccess, secure_url } = useSelector((state) => state.product)
    const { user } = useSelector((state) => state.user)

    const dispatch = useDispatch()

    const upload = () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("productId", selectedProduct._id);
        dispatch(uploadProductImage(formData));
    }

    const deleteImage = async (image) => {
        const updatedImageArray = images.filter((img) => img !== image)
        const updatedProduct = {...selectedProduct, images: updatedImageArray };

        const payload = {
            id: selectedProduct._id,
            ...updatedProduct
        }

        dispatch(editProduct(payload))
        setUpdatedImages(updatedImageArray)
    }

    useEffect(() => {
        const payload = {
            seller: user?._id
        }

        if (uploadSuccess) {
            setShowPreview(false);
            setImages(prevImages => [...prevImages, secure_url])
            setFile(null)
            dispatch(getAllProducts(payload))
            dispatch(resetProductStatus())
        } 
    }, [dispatch, secure_url, uploadSuccess, user?._id]);

    useEffect(() => {
      if (isUpdated) {
        setImages(updatedImages)
        dispatch(resetProductStatus())
        setUpdatedImages(null)
      }
    }, [dispatch, isUpdated, updatedImages])
    
    console.log(images);
  return (
    <div>
        <div className='flex gap-5 mb-5'>
            {images?.map((img, i) =>{
                return <div key={i} className="flex gap-3 border border-solid border-gray-500 rounded p-3 items-end">
                    <img src={img} alt="/" className='h-20 w-20 object-cover' />
                    <RiDeleteBin6Line size={16} color='#FF0000'
                        onClick={() => deleteImage(img)}
                    />
                </div>
            })}
        </div>
        <Upload
            accept="image/*"
            listType='picture'
            beforeUpload={() => false}
            onChange={(info) => { 
                setFile(info.file)
                setShowPreview(true)
            }}
            showUploadList={showPreview}
            fileList={file ? [file] : []}
        >
            <Button type='dashed'>Upload Image</Button>
        </Upload>
        <div className="flex justify-end gap-5 pt-4">
            <Button 
                type='default'
                onClick={() => setShowProductForm(false)}
            > 
                Cancel
            </Button>
            <Button 
                type='primary'
                onClick={upload}
                disabled={!file}
            > 
                Upload
            </Button>
        </div>
    </div>
  )
}

export default Images