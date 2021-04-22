import React, {useState}  from 'react';
import { Checkbox, Form, Input, Button, Row, Col } from 'antd';
import axiosInstance from "../helpers/axiosInstance";
import axios from 'axios';
import qs from 'qs';
// core components
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import identityConfig from '../identityconfig';
import environmentConfig from '../environment';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


const LoginComponent =() => {
  
const [autoLogin, setAutoLogin] = useState(true);
const [userName, setUserName] = useState('');
const [password, setPassword] = useState('');

const onLogin = () => {
  axiosInstance()
  .post('/api/account/login', { 
    username: userName, password: password })
    .then((res) => {
      axios({
        method: 'post',
        url: `${environmentConfig().authApiUrl}/connect/token`,
        data: qs.stringify({
          client_id: identityConfig().clientId, client_secret: identityConfig().clientSecret , scope: identityConfig().scope, grant_type: identityConfig().grantType
        }),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
      .then((res) => {
        console.log(res);
       localStorage.token = res.data.access_token;
       toast("Success");
      // window.location = "/admin/transactions";
      });

    })
    .catch((error) => {
       toast("Could not connect!");
    });
};

    return (
    <div className="login-warp">
    <ToastContainer />
    <div className="login-container container"></div>
    <Row>
      <Col span={9}></Col>
      <Col span={5}>
      <Form
      {...layout}
      name="basic"
    >
      <Form.Item
        label="Username"
        name="username"
        placeholder="Test"
        rules={[{ required: true, message: 'Please input your username!' 
      }]}
      >
        <Input placeholder="Username" className="form-control" onChange = {(e) => setUserName(e.target.value)}  />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password  type="password" placeholder="Password" onChange = {(e) => setPassword(e.target.value)}/>
      </Form.Item>

      <Form.Item {...tailLayout} name="remember">
        <Checkbox  checked={autoLogin}>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button  type="primary" htmlType="submit" onClick = {() => onLogin()} >
          Submit
        </Button>
      </Form.Item>
    </Form>
    
      
      
      </Col>
      <Col span={9}></Col>
    </Row>
 
    
     </div>
    
    )
}

export default LoginComponent
