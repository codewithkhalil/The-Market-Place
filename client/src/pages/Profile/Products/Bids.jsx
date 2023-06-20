import { Modal, Table } from 'antd'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBids } from '../../../redux/slice/bid/bidSlice'
import { Divider } from '../../../components'

const Bids = ({
    showBidsModal,
    setShowBidsModal,
    selectedProduct
}) => {
    const { bids } = useSelector(state => state.bid)
    const dispatch = useDispatch()

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            render: (text, record) => {
                return ( 
                    <p>{record.buyer.name}</p>
                )
            }
        },
        {
            title: "Bid Amount",
            dataIndex: "bidAmount",
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
      dispatch(getAllBids({product: selectedProduct?._id}))
    }, [dispatch, selectedProduct?._id])
    
  return (
    <Modal
        // title="Bids"
        open={showBidsModal}
        onCancel={() => setShowBidsModal(false)}
        centered
        width={1200}
        footer={null}
    >
        <div className="flex gap-3 flex-col">
            <h1 className='text-xl text-primary'>Bids</h1>
            <Divider />
            <h1 className='text-xl text-gray-500'>Product Name: {selectedProduct?.name}</h1>

            <Table columns={columns} dataSource={bids} />
        </div>

        
    </Modal>
  )
}

export default Bids