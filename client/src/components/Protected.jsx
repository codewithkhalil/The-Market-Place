import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, resetUser } from "../redux/slice/user/userSlice";
import { FaRegUserCircle } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { Avatar, Badge, message } from "antd";
import { removeSessionToken } from "../utils/storage";
import { resetProduct } from "../redux/slice/product/productSlice";
import { IoIosNotificationsOutline } from 'react-icons/io'
import Notifications from "./Notifications";
import { getAllNotification, readAllNotification, resetNotificationStatus } from "../redux/slice/notification/notificationSlice";


const Protected = ({ children }) => {
  const [showNotifications, setShowNotifications] = useState(false)
  const { user, isSuccess } = useSelector((state) => state.user);
  const { notifications, readSuccess } = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      dispatch(getCurrentUser());
      dispatch(getAllNotification())
    } else {
      navigate("/login");
    }
  }, [dispatch,isSuccess, navigate]);

  useEffect(() => {
    if (readSuccess) {
      dispatch(getAllNotification())
      dispatch(resetNotificationStatus())
    }
  }, [dispatch, readSuccess])
  

  return (
    user && (
      <div>
        {/* header */}
        <div className="flex justify-between items-center bg-primary p-5">
            <h1 
              className="text-2xl text-white cursor-pointer"
              onClick={() => navigate('/')}
            >TMP</h1>

            <div className="flex gap-5 items-center">
              <Badge 
                count={notifications?.filter((notification) => !notification.read).length} 
                onClick={() => {
                  dispatch(readAllNotification())
                  setShowNotifications(true)
                }}
                className='cursor-pointer'
                size="small"
              >
                <Avatar 
                  icon={<IoIosNotificationsOutline size={23} className='text-center' />} />
              </Badge>
              <div className="bg-white py-2 px-5 rounded flex gap-2 items-center">
                  <FaRegUserCircle size={20}/>
                  <span 
                    className="underline cursor-pointer uppercase"
                    onClick={() => {
                      if (user.role === 'admin') {
                        navigate('/admin')
                      }else{
                        navigate('/profile')
                      }
                    }}
                  >
                    {user.name}
                  </span>
                  <FiLogOut 
                      className="ml-6 cursor-pointer" 
                      onClick={() => {
                          removeSessionToken('token');
                          navigate('/login')
                          message.success('Logout successfull')
                          dispatch(resetUser())
                          dispatch(resetProduct())
                      }}
                  />
              </div>
            </div>
        </div>
        {/* body */}
        <div className="p-5">{children}</div>

        {<Notifications 
          setShowNotifications={setShowNotifications}
          showNotifications={showNotifications}
        />}
      </div>
    )
  );
};

export default Protected;
