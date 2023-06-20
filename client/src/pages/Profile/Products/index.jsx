import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProducts, resetProductStatus } from "../../../redux/slice/product/productSlice";
import ProductsForm from "./ProductsForm";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdOutlineModeEditOutline } from 'react-icons/md'
import moment from "moment/moment";
import Bids from "./Bids";

const Products = () => {
    const [showBidsModal, setShowBidsModal] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [products, setProducts] = useState(null)
  const [showProductForm, setShowProductForm] = useState(false);

  const { isLoading,deleteSuccess, isSuccess, createSuccess, isUpdated, products: dbProducts } = useSelector((state) => state.product)
  
  const { user } = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const columns =[
    {
        title: 'Product',
        dataIndex: "image",
        render: (text, record) => {
            if (record?.images?.length > 0) {
                return (<img src={ record.images[0]} alt='product' className="w-16 h-16 object-cover rounded-md" />)
            }
            return <p></p>
        }
    },
    { 
        title: "Name",
        dataIndex: "name",
    },
    { 
        title: "Price",
        dataIndex: "price",
    },
    { 
        title: "Category",
        dataIndex: "category",
    },
    { 
        title: "Product Age",
        dataIndex: "age",
    },
    { 
        title: "Status",
        dataIndex: "status",
    },
    { 
        title: "Added On",
        dataIndex: "createdAt",
        render: (text, record) => {
           return moment(record.createdAt).format("DD/MM/YYYY hh:mm a"); 
        }
    },
    { 
        title: "Action",
        dataIndex: "action",
        render : (text, record) => {
            return <div className="flex gap-3 items-center">
                <RiDeleteBin6Line size={20} 
                    onClick={() => dispatch(deleteProduct(record._id))}
                />
                <MdOutlineModeEditOutline 
                    size={20} 
                    className="cursor-pointer"
                    onClick={() => {
                        setSelectedProduct(record)
                        setShowProductForm(true)
                    }}
                />

                <span 
                    className="underline cursor-pointer"
                    onClick={() => {
                        setSelectedProduct(record)
                        setShowBidsModal(true)
                    }}
                >
                    Show Bids
                </span>
            </div>
        }
    },
  ]

  useEffect(() => {
    setProducts(null)
    resetProductStatus()
    const payload = {
        seller: user?._id
    }
    dispatch(getAllProducts(payload))
    dispatch(resetProductStatus()) 

    
  }, [dispatch, createSuccess, user?._id, deleteSuccess, isUpdated]);

  useEffect(() => {
    if (isSuccess) {
        setProducts(dbProducts)
        dispatch(resetProductStatus())
    }
  }, [dbProducts, dispatch, isSuccess])

//   console.log(selectedProduct);

  return (
    <div>
        <div className="flex justify-end mb-3">
            <Button type="default" onClick={() => {
                setShowProductForm(true)
                setSelectedProduct(null)}}>
            {" "}
            Add Product{" "}
            </Button>
        </div>

        {!isLoading ? <div>
            <Table columns={columns} dataSource={!isLoading && products?.map(product => ({ ...product, key: product._id }))} className='overflow-x-scroll no-scrollbar' />
            </div> : null}
            {showProductForm && (
                <ProductsForm
                showProductForm={showProductForm}
                setShowProductForm={setShowProductForm}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                />
            )}    

        {showBidsModal && 
        <Bids
            setShowBidsModal={setShowBidsModal}
            showBidsModal={showBidsModal}
            selectedProduct={selectedProduct}
        /> }
    </div>
  );
};

export default Products;
