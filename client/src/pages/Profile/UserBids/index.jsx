import { Table } from 'antd'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBids } from '../../../redux/slice/bid/bidSlice'

const UserBids = () => {
    const { bids } = useSelector(state => state.bid)
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch()

    const columns = [
        {
            title: "Product",
            dataIndex: "product",
            render: (text, record) => {
                return ( 
                    <p>{record.product.name}</p>
                )
            }
        },
        {
            title: "Original Amount",
            dataIndex: "origialAmount",
            render: (text, record) => {
                return ( 
                    <p>{record.product.price}</p>
                )
            }
        },
        {
            title: "Bid Amount",
            dataIndex: "bidAmount",
        },
        {
            title: "Seller",
            dataIndex: "name",
            render: (text, record) => {
                return ( 
                    <p>{record.seller.name}</p>
                )
            }
        },
        {
            title: "Bid Date",
            dataIndex: "createdAt",
            render: (text, record) => {
                return moment(text).format("MMM Do YYYY, h:mm a");
            }
        },
        {
            title: "Message",
            dataIndex: "message",
        },
        {
            title: "Contact Details",
            dataIndex: "contactDetails",
            render: (text, record) => {
                return (
                    <div>
                        <p>Phone: {record?.mobile}</p>
                        <p>Email: {record?.buyer.email}</p>
                    </div>
                )
            }
        },
    ]

    useEffect(() => {
      dispatch(getAllBids({buyer: user?._id}))
    }, [dispatch, user?._id])
    
  return (
    <div
        centered
        width={1200}
        footer={null}
    >
        <div className="flex gap-3 flex-col">
            <Table columns={columns} dataSource={bids} className='overflow-x-scroll no-scrollbar' />
        </div>

        
    </div>
  )
}

export default UserBids