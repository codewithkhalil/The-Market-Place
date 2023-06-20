import React from 'react'
import { Tabs } from 'antd'
import Products from './Products'
import UserBids from './UserBids'
import { useSelector } from 'react-redux'
import moment from 'moment'

const Profile = () => {
    const { user } = useSelector((state) => state.user);
  return (
    <div>
        <Tabs defaultActiveKey='1'>
            <Tabs.TabPane tab='Products' key={'1'}>
                <Products />
            </Tabs.TabPane>
            <Tabs.TabPane tab='My Bids' key={'2'}>
                <UserBids />
            </Tabs.TabPane>
            <Tabs.TabPane tab='General' key={'3'}>
                <div className="flex flex-col w-full lg:w-1/2 xl:w-1/3 gap-3">
                    <span className='text-gray-600 text-lg md:text-xl flex justify-between'>Name: <b className='text-lg md:text-xl'>{user?.name}</b></span>
                    <span className='text-gray-600 text-lg md:text-xl flex justify-between'>Email: <b className='text-lg md:text-xl'>{user?.email}</b></span>
                    <span className='text-gray-600 text-lg md:text-xl flex justify-between'>Joined At: <b className='text-lg md:text-xl'>{moment(user.createdAt).format("MMM D , YYYY hh:mm A")}</b></span>
                </div>
            </Tabs.TabPane>
        </Tabs>
    </div>
  )
}

export default Profile