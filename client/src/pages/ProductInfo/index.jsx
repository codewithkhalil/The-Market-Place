import { Button } from 'antd';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getAllBids, resetBidStatus } from '../../redux/slice/bid/bidSlice';
import { getSingleProduct } from '../../redux/slice/product/productSlice';
import BidModal from './BidModal';

const ProductInfo = () => {
    const [showBidModal, setShowBidModal] = useState(false)
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)

    const { id } = useParams();

    const { user } = useSelector((state) => state.user);
    const { bids, createSuccess } = useSelector(state => state.bid)
    const { product } = useSelector((state) => state.product)

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getSingleProduct(id))
    }, [dispatch, id])

    useEffect(() => {
        dispatch(getAllBids({product: id}))
        dispatch(resetBidStatus())
    }, [dispatch, id, createSuccess])

  return (
    product && 
    <div className='mt-5'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* images */}
            <div className='flex flex-col gap-4 mb-3 md:mb-0'>
                {product?.images && <img 
                    src={ product?.images[selectedImageIndex]} 
                    alt="/" 
                    className='w-full h-96 object-cover rounded-md'
                />}
                <div className="flex gap-5">
                    {product?.images?.map((image, index) => {
                        return (
                            <img 
                                key={index}
                                src={image} 
                                alt="/" 
                                className={`w-20 h-20 object-cover rounded-md cursor-pointer border hover:border-solid border-primary ${selectedImageIndex === index && 'border-2 border-solid border-blue-700 p-1'}
                                `}
                                onClick={() => setSelectedImageIndex(index)}
                            />
                        )
                    })}
                </div>
                <div>
                    <h1 className='text-gray-700'>Added On</h1>
                    <span className='text-gray-600'>{moment(product.createdAt).format("MMM D , YYYY hh:mm A")}</span>
                </div>
            </div>
            {/* details */}
            <div className="flex flex-col gap-5">
                <div className=''>
                    <h1 className="text-3xl font-semibold text-gray-800">{product.name}</h1>
                    <p className="text-sm">{product.description}</p>
                </div>
                <div className='flex flex-col'>
                    <h1 className="text-xl font-semibold text-gray-800">Product Details</h1>
                    <div className="flex justify-between mt-3">
                        <span>Price</span>
                        <span>$ {product.price}</span>
                    </div>
                    <div className="flex justify-between mt-3">
                        <span>Category</span>
                        <span>{product.category}</span>
                    </div>
                    <div className="flex justify-between mt-3">
                        <span>Bill Available</span>
                        <span>{product.billAvailable ? "Yes" : "No"}</span>
                    </div>
                    <div className="flex justify-between mt-3">
                        <span>Box Available</span>
                        <span>{product.boxAvailable ? "Yes" : "No"}</span>
                    </div>
                    <div className="flex justify-between mt-3">
                        <span>Accessories Available</span>
                        <span>{product.accessoriesAvailable ? "Yes" : "No"}</span>
                    </div>
                    <div className="flex justify-between mt-3">
                        <span>Warranty Available</span>
                        <span>{product.warrantyAvailable ? "Yes" : "No"}</span>
                    </div>
                    <div className="flex justify-between mt-3">
                        <span>Purchased Year</span>
                        <span>{moment().subtract(product.age, 'years').format("YYYY")} ({product.age} year{product.age > 1 && 's'} ago)</span>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <h1 className="text-xl font-semibold text-gray-800">Seller Details</h1>
                    <div className="flex justify-between mt-3">
                        <span>Name</span>
                        <span>{product?.seller?.name}</span>
                    </div>
                    <div className="flex justify-between mt-3">
                        <span>Email</span>
                        <span>{product?.seller?.email}</span>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-semibold text-gray-800">Bids</h1>
                        <Button 
                            onClick={() => setShowBidModal(!showBidModal)}
                            disabled={product.seller._id === user._id}
                        >
                            New Bid
                        </Button>
                    </div>

                    {product?.showBidsOnProductPage && (bids?.map(bid => {
                        return <div 
                        className="border border-gray-300 border-solid p-3 rounded mt-5 text-gray-700 hover:border-none hover:shadow-xl"
                        key={bid._id}>
                            <div className="flex justify-between mt-1">
                                <span>Name</span>
                                <span>{bid.buyer.name}</span>
                            </div>
                            <div className="flex justify-between mt-2">
                                <span>Bid Amount</span>
                                <span>$ {bid.bidAmount}</span>
                            </div>
                            <div className="flex justify-between mt-2">
                                <span>Bid Placed On</span>
                                <span> {moment(bid.createdAt).format("MMM D , YYYY hh:mm A")}</span>
                            </div>
                        </div>
                    }))}
                </div>
            </div>
        </div>
        {showBidModal && <BidModal 
            product={product}
            reloadData={getSingleProduct(id)}
            setShowBidModal={setShowBidModal}
            showBidModal={showBidModal}
        />}
    </div>
  )
}

export default ProductInfo