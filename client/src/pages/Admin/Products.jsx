import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, resetProductStatus, updateProductStatus } from "../../redux/slice/product/productSlice";
// import ProductsForm from "./ProductsForm";
import moment from "moment/moment";

const Products = () => {
    // const [selectedProduct, setSelectedProduct] = useState(null)

  const { createSuccess, products, isUpdated } = useSelector((state) => state.product)

  const dispatch = useDispatch()

  const onStatusUpdate = (id, status) => {
    const payload = {
        id: id,
        status: status
    }

    dispatch(updateProductStatus(payload))
  }

  const columns =[
    {
        title: 'Product Image',
        dataIndex: "image",
        render: (text, record) => {
            if (record?.images?.length > 0) {
                return (<img src={ record.images[0]} alt='product' className="w-20 h-20 object-cover rounded-md" />)
            }
            return <p></p>
        }
    },
    { 
        title: "Product",
        dataIndex: "name",
    },
    { 
        title: "Seller",
        dataIndex: "name",
        render: (text, record) => {
            return record.seller.name
        }
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
        render: (text, record) => {
            return <p className="uppercase">{record.status}</p>
        }
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
            const {status, _id} = record
            return <div className="flex gap-3">
                {status === "pending" && (
                    <span 
                        className="underline cursor-pointer text-green-700"
                        onClick={() => onStatusUpdate(_id, "approved")}
                    >
                        Approve
                    </span>
                )}
                {status === "pending" && (
                    <span 
                        className="underline cursor-pointer text-red-500"
                        onClick={() => onStatusUpdate(_id, "rejected")}
                    >
                        Reject
                    </span>
                )}
                {status === "approved" && (
                    <span 
                        className="underline cursor-pointer text-red-500"
                        onClick={() => onStatusUpdate(_id, "blocked")}
                    >
                        Block
                    </span>
                )}
                {status === "blocked" && (
                    <span 
                        className="underline cursor-pointer text-green-700"
                        onClick={() => onStatusUpdate(_id, "approved")}
                    >
                        Unblock
                    </span>
                )}
            </div>
        }
    },
  ]

  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(resetProductStatus()) 
  }, [dispatch, createSuccess, isUpdated]);

  
  return (
    <div>
        {/* <div className="flex justify-end mb-3">
            <Button type="default" onClick={() => {
                setSelectedProduct(null)}}>
            {" "}
            Add Product{" "}
            </Button>
        </div> */}

        <Table columns={columns} dataSource={products?.map(product => ({ ...product, key: product._id }))} className='overflow-x-scroll no-scrollbar mt-2' />
    </div>
  );
};

export default Products;
