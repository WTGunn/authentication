import '../App.css';
import { Layout, Row, Col, Card, Button, Form, Input, message } from 'antd';
import React, { Component } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Routes, Route, Link } from 'react-router-dom';
import Register from './register';
import Axios from 'axios'

const { Content } = Layout;

Axios.defaults.withCredentials = true;

class Login extends Component {

    constructor() {
        super();
        this.state = {
          username: '',
          password: '',
          loginStatus: ''
        };
    }

    log = () => {
        Axios.post("http://localhost:3001/login", {
          username: this.state.username, 
          password: this.state.password,
        }).then((response) => {
          if (response.data.message) {
            this.setState(({loginStatus: false}))
            message.error(response.data.message);
          }
          else {
            this.setState(({loginStatus: true}))
            message.success("You have successfully logged in! Now return to homepage to log out.");
          }
          
        });
      }
    
    render() {
        return (
            <Layout style={{ minHeight:"100vh", backgroundColor:"#364D79" }}>

            <Routes>
              <Route path="register" element={<Register />}></Route>
            </Routes>
    
            <Content style= {{margin: '100px 0px'}}>
                <Row>
                    <Col span={7}></Col>
                    <Col span={10}>
                        <Card
                        type="inner"
                        title="ACCOUNT LOGIN"
                        extra={<Link to='/'>Back</Link>}
                        style={{
                            minHeight:"50vh"
                        }}
                        >
                        <p style={{margin: '30px 0px'}}><Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={this.log}
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" onChange={(e) => {this.setState({username: e.target.value})}}/>
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                onChange={(e) => {this.setState({password: e.target.value})}}
                                />
                            </Form.Item>
    
                            <Form.Item style={{position:'relative', textAlign:'center', marginTop:'50px'}}>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                                </Button>
                                Or <Link to='/register'>register now!</Link>
                            </Form.Item>
                        </Form></p>
                        </Card>
                    </Col>
                    <Col span={7}></Col>
                </Row>
            </Content>
      </Layout>
        );
    }
}

export default Login;