import React, { Component } from 'react'
import { Row , Col , Button } from 'antd'
import { Link } from 'react-router-dom';


class PageSwap extends Component{
    render(){
        
        const buttonStyle={
            margin:'5px',
            background:'#fde869',
            borderColor:'#4484ce',
            width:'98%',
            height:'auto'
        }
        const textStyle={
            fontWeight:'bold',
            color:'#565759',
            fontSize:'2vw',
            marginBottom:'5px'
        
        }
        return(
            <div style={{fontSize:'2vw'}}>
                <Row style={{background:'#ffffff',height:'100%'}}>
                    <Col span={12}>
                        <Button style={buttonStyle} type="primary"  >
                            <Link to="/GeneralSearching">
                                <p style={textStyle}>
                                    Searching
                                </p>
                            </Link>
                            
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button style={buttonStyle} type="primary"  >
                            <Link to="/LicensePlateSearching">
                                <p style={textStyle}>
                                    Car Tracking
                                </p>
                            </Link>
                            
                        </Button>
                    </Col>
                    
                    
                    
                    
                </Row>
            </div>
            
            
      );
    }
  }
  export default PageSwap;