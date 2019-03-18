import React, { Component } from 'react';
import {Row , Col} from 'antd'
import Head from '../Header';
import Foot from '../Footer';
import FullPageLayout from '../FullPageLayout';

import Contents from './Content';
import PageSwap from '../PageSwap';

class AddModel extends Component{
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
        <Row >
          
          <Col span={24}>
            <Contents/>
          </Col>
          
        </Row>
        <hr />
        <Row>
          <Col span={24}>
            <Foot />
          </Col>
        </Row>
       
        
      </FullPageLayout>
      
    );
  }
}



export default AddModel;
