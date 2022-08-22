import '../App.css';
import { Layout, Row, Col, Card, Button, Form, Input, message } from 'antd';
import React, { Component } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Axios from 'axios'

const { Content } = Layout;

Axios.defaults.withCredentials = true;

class Register extends Component {

    constructor() {
        super();
        this.state = {
          usernameReg: '',
          passwordReg: ''
        };
    }
    
    reg = async () => {
        Axios.post("http://localhost:3001/register", {
          username: this.state.usernameReg, 
          password: this.state.passwordReg,
        });

        message.success("Your registration was succesful! Now return to login page to log in.");
    }

    render() {
        return (
            
            <Layout style={{ minHeight:"100vh", backgroundColor:"#364D79" }}>

            <Content style= {{margin: '100px 0px'}}>
                <Row>
                    <Col span={7}></Col>
                    <Col span={10}>
                        <Card
                        type="inner"
                        title="ACCOUNT REGISTRATION"
                        extra={<Link to='/login'>Back</Link>}
                        style={{
                            minHeight:"50vh"
                        }}
                        >
                        <p style={{margin: '30px 0px'}}><Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={this.reg}
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input 
                                prefix={<UserOutlined className="site-form-item-icon" />} 
                                placeholder="Username" 
                                onChange={(e) => {this.setState({usernameReg: e.target.value})}}
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                onChange={(e) => {this.setState({passwordReg: e.target.value})}}
                                />
                            </Form.Item>
    
                            <Form.Item style={{position:'relative', textAlign:'center', marginTop:'50px'}}>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Register Now
                                </Button>
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

export default Register;