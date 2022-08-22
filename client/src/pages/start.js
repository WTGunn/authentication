import '../App.css';
import { Layout, Menu, Typography } from 'antd';
import { Routes, Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import Banner from '../components/banner';
import Login from './login';
import Axios from 'axios'

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

Axios.defaults.withCredentials = true;

class Start extends Component {

  constructor() {
    super();
    this.state = {
      loginStatus: false
    };
  }

  logout = () => {
      Axios.get('http://localhost:3001/logout'); 

      window.location.reload(); 
  }

  render() {

      Axios.get("http://localhost:3001/login").then((response) => {
        if (response.data.loggedIn == true) {
          this.setState(({loginStatus: true}))
        }
      });

      const isLoggedIn = this.state.loginStatus;
      let button;
      if (isLoggedIn) {
        button = <a onClick={this.logout}>Log Out</a>;
      } else {
        button = <Link to='login'>Log In</Link>;
      }

      return (
        <Layout>
          <Routes>
            <Route path="login" element={<Login />}></Route>
          </Routes>

          <Header
            style={{
              position: 'fixed',
              zIndex: 1,
              width: '100%',
            }}
          >
            <div style={{float: 'left', width: '180px', height: '100%', textAlign: 'center'}}><h4 style={{color:'white'}}>Authentication App</h4></div>
            <Menu mode="horizontal" theme='dark' style={{float:'right'}}>
              <Menu.Item style={{width: '100px', textAlign: 'center'}}>
                  {button}
              </Menu.Item>
            </Menu>
          </Header>

          <Content
            className="site-layout"
            style={{
              marginTop: 64,
            }}
          >
          <Banner/>
          </Content>

          <Footer
            style={{
              backgroundColor: '#121212',
              textAlign: 'center',
            }}
          >
            <Text style={{color: 'white'}}>Created by Gunn Wei Teong</Text>
          </Footer>
        </Layout>
      );
  }
}

export default Start;