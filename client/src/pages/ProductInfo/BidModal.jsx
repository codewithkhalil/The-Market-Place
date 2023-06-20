import { Form, Input, Modal } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { placeNewBid } from '../../redux/slice/bid/bidSlice';
import { addNotification } from '../../redux/slice/notification/notificationSlice';

const BidModal = ({
    showBidModal,
    setShowBidModal,
    product,
    reloadData
}) => {
    const [values, setValues] = useState(null)
    const formRef = useRef();

    const { user } = useSelector((state) => state.user);
    const { createSuccess } = useSelector((state) => state.bid);

    const dispatch = useDispatch();


    const rules = [
        {
          required: true,
          message: "Field is required",
        },
    ];

    useEffect(() => {
      if (createSuccess) {
        console.log('here in fn');
        dispatch(addNotification({
            title: "A new bid has been placed",
            message: `A new bid has been placed on your product ${product?.name} by ${user?.name} for ${values?.bidAmount}`,
            user: product?.seller?._id,
            onClick: `/profile`,
            read: false
        }))
        setShowBidModal(false)
      }
    }, [createSuccess, dispatch, product?._id, product?.seller?._id, product?.name, setShowBidModal, user?.name, values?.bidAmount])
    

    const onFinish = (values) => { 
        setValues(values)
        const payload = {
            ...values,
            product: product._id,
            seller: product.seller._id,
            buyer: user._id
        }
        dispatch(placeNewBid(payload));
    }
  return (
    <Modal
        onCancel={() => setShowBidModal(false)}
        open={showBidModal}
        centered
        width={500}
        onOk={() => formRef.current.submit()}
    >
        <div className='flex flex-col gap-5 mb-5'>
            <h1 className='text-xl font-semibold text-gray-800 text-center'>
                Place A Bid
            </h1>
            <Form layout='vertical' ref={formRef} onFinish={onFinish}>
                <Form.Item
                    label="Bid Amount"
                    name='bidAmount'
                    rules={rules}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Message"
                    name='message'
                    rules={rules}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="Mobile"
                    name='mobile'
                    rules={rules}
                >
                    <Input type='number'/>
                </Form.Item>
            </Form>
        </div>
    </Modal>
  )
}

export default BidModal