import React, { Component } from 'react';
import {Row , Col} from 'antd'
// import { Layout } from 'antd';

// const { Header, Footer, Sider, Content } = Layout;
import Head from '../Header';
import Contents from './Content';
import Footer from '../Footer';
import FullPageLayout from '../FullPageLayout';


import PageSwap from '../PageSwap';
// import Map from './Map';
class Reporting extends Component{
  render(){
    
    return(
      <FullPageLayout>
        <Row>
          <Col span={24}>
            <Head />
          </Col>
        </Row>
          <hr />
        <Row>
          <Col span={24}>
            <PageSwap />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col span={24}>
            <Contents />
            {/* <PageSwitcher /> */}
            
          </Col>
        </Row>
        <hr />
        <Row>
          <Col span={24}>
            <Footer />
          </Col>
        </Row>
       
        
      </FullPageLayout>
      
    );
  }
}



export default Reporting;
