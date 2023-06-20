import { Tabs } from 'antd'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Products from './Products'
import Users from './Users'

const Admin = () => {
    const navigate = useNavigate()

    const { user } = useSelector((state) => state.user);

    useEffect(() => {
      if (user.role !== 'admin') {
        navigate('/')
      }
    }, [navigate, user.role])
    
  return (
    <div>
        <Tabs defaultActiveKey='1'>
            <Tabs.TabPane tab='Products' key={'1'}>
                <Products />
            </Tabs.TabPane>
            <Tabs.TabPane tab='Users' key={'2'}>
                <Users />
            </Tabs.TabPane>
            <Tabs.TabPane tab='General' key={'3'}>
                <h1>General</h1>
            </Tabs.TabPane>
        </Tabs>
    </div>
  )
}

export default Admin