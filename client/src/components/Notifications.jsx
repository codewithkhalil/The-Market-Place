import { Alert, Modal, Space } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri'
import moment from 'moment/moment';
import { deleteNotification } from '../redux/slice/notification/notificationSlice';

const Notifications = ({
    showNotifications,
    setShowNotifications
}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { notifications } = useSelector((state) => state.notification);
  return (
    <Modal
        title='Notifications'
        open={showNotifications}
        onCancel={() => setShowNotifications(false)}
        footer={null}
        centered
        width={600}
    >
        {notifications.length > 0 ?<div className='flex flex-col gap-2'>
            {notifications?.map(notification => (
                <div className="flex p-2 flex-col border border-gray-300 border-solid rounded mt-5 text-gray-700 hover:border-none hover:shadow-xl cursor-pointer"
                >
                    <div className="flex justify-between items-center">
                        <div className='mr-3'
                        onClick={() => {
                            navigate(notification.onClick)
                            setShowNotifications(false)
                        }}>
                            <h1>{notification.title}</h1>
                            <span>{notification.message}</span>
                            <h4 className='text-xs mt-1'>{moment(notification?.createdAt).fromNow()}</h4>
                        </div>
                        <RiDeleteBin6Line 
                            size={20} 
                            onClick={() => dispatch(deleteNotification(notification?._id))}
                        />
                    </div>
                </div>
            ))}
        </div> : <Space
          direction="vertical"
          style={{
          width: '100%',
          }}
          className="mt-2"
        >
          <Alert message="There are no notifications to display " banner />
        </Space>}
    </Modal>
  )
}

export default Notifications