import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Divider } from "../../components";
import { loginUser } from "../../redux/slice/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import LOGO from '../../assets/logo.png';

const rules = [
  {
    required: true,
    message: 'required',
  }
]
const Login = () => {
  const { isSuccess } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onFinish = async (values) => {
    dispatch(loginUser(values))
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      navigate('/')
    }
  }, [navigate, dispatch, isSuccess])
  
  return (
    <div className="h-screen bg-primary/70 flex justify-center items-center p-5 md:p-0">
      <img 
        src="https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1848&q=80" alt="" 
        className="h-full w-full absolute z-[-10] object-cover"
      />
      <div className="bg-white p-5 rounded w-[450px]">
        <h1 className="text-[#005478] text-2xl flex items-end gap-2">
          <img src={LOGO} alt="" className="w-8" /> TMP -<span className="text-gray-400 uppercase"> Login</span>
        </h1>
        <Divider />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={rules}>
            <Input placeholder="Email" type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <Input placeholder="Password" type="password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block className="mt-2">
            Login
          </Button>

          <div className="mt-5 text-center ">
            <span className="text-gray-500">Don't have an account? <Link to='/register' className="text-primary">Register</Link> </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
