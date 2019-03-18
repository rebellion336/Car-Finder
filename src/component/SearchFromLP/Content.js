import React, { Component } from 'react'
import axios from 'axios'
import ReactMapboxGl, { Layer, Feature ,Source  } from "react-mapbox-gl";
import { Menu, Dropdown, Icon , Button ,Slider, InputNumber, Col, Row, Card, Table, Input} from 'antd';
import {verifymodelService, modelList, createmodelService} from '../../data/DataService';
import Loader from 'react-loader-spinner'
   
const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1IjoidGluZ2x5MzEwMSIsImEiOiJjanQzMW1ld3gxOTl4M3ludnJ2dTY3bWwxIn0.iVnskrNVRBQbx2mj7BLFJA"
  });

class TrackingContent extends Component{

    constructor(props) {
        super(props);
        this.state = {
            LP:'',
            data: '',
        };
        this.setLoader=this.setLoader.bind(this);
        this.submitSearch = this.submitSearch.bind(this)
    }
    onChangeLP = (e) => {
    
        this.setState({
          LP: e.target.value,
        });
        // console.log('licensePlate>>>>',this.state.LP)
      }

    setLoader(loadStatus){
        this.setState({ loader : loadStatus })
    }

    componentWillMount(){
        modelList(this.setList);
        
    }
    
    submitSearch(){
        const serviceurl='http://localhost:5000'
        const urls =serviceurl + '/search'
        let query = {} 
        
        
        if(this.state.LP !== ''){
          query.licensePlates = this.state.LP
        }
        
        const body = JSON.stringify(query)
        console.log(body)
        axios({
            method : 'post',
            headers : {
                'Access-Control-Allow-Origin' : '*',
                'Content-Type' : 'application/json'
            },
            data : body,
            url : urls,
        }).then(res => {
            this.setState({data: res.data})
        });
      }
    render(){
        const source = {
            "type": "geojson",
            "data": {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [-122.48369693756104, 37.83381888486939],
                        [-122.48348236083984, 37.83317489144141],
                        [-122.48339653015138, 37.83270036637107],
                        [-122.48356819152832, 37.832056363179625],
                        [-122.48404026031496, 37.83114119107971],
                        [-122.48404026031496, 37.83049717427869],
                        [-122.48348236083984, 37.829920943955045],
                        [-122.48356819152832, 37.82954808664175],
                        [-122.48507022857666, 37.82944639795659],
                        [-122.48610019683838, 37.82880236636284]
      
                    ]
                }
            }
        }

        const columns = [{
            title: 'ป้ายทะเบียน',
            dataIndex: 'licensePlates',
          }, {
            title: 'จังหวัด',
            dataIndex: 'province',
          }, {
            title: 'ยี่ห้อ',
            dataIndex: 'carBrand',
          }, {
            title: 'สีรถ',
            dataIndex: 'carColor',
          }, {
            title: 'ประเภทรถ',
            dataIndex: 'carType',
          }, {
            title: 'วันที่จับภาพ',
            dataIndex: 'datetime',
          }, {
            title: 'หมายเลขกล้องที่จับภาพ',
            dataIndex: 'camID',
          }]
        // if(this.state.loader === 'true'){
        //     return(
        //         <div style={{textAlign: 'center' ,background: '#848787' ,borderRadius: '4px'  ,paddingTop:'180px' ,height:'400px'}}>
        //             <Loader 
        //                 type="ThreeDots"
        //                 color="#F30B5B"
        //                 height="100"	
        //                 width="100"
        //             /> 
        //         </div>
                 
        //     )
        // }
        // else if(this.state.loader === 'false'){

        return(
            <div>
                <Card style={{textAlign:'center',background:'#fde869'}}>
                    <Row style = {{color:'#000000'}}>
                    <Col span={10}></Col>
                    <Col span={2} style={{marginTop:'7px'}}>ป้ายทะเบียน</Col>
                    <Col span={2}>
                        <Input size="large" placeholder="Ex : กข 1234" style={{width:'100%',padding:'1%'}} onChange={this.onChangeLP}/>
                    </Col>
                    <Col span={10}></Col>  
                    </Row>
                </Card>

                <Row style={{paddingTop:'2%',paddingBottom:'2%',background:'#565759'}}>
                    <Col span={8}/>
                    <Col span={8} > 
                    <Button block onClick={this.submitSearch}>Search</Button>
                    </Col>
                    <Col span={8}/>
                </Row>

                <Table style={{textAlign:'center'}} columns={columns} dataSource={this.state.data} pagination={false} size="small" />
                
                <Map
                style="mapbox://styles/mapbox/streets-v9"
                // Lat =13.736717 Lng =100.523186. [lng,lat]
                center= {[100.523186,13.736717]}
                containerStyle={{
                    height: "100vh",
                    width: "100vw",
                }}>
                <Source id="STEST" tileJsonSource={source}/>
                    <Layer
                    sourceId = "STEST"
                    type="line" 
                    layout={{ 
                        "line-join": "round",
                        "line-cap": "round" 
                    }}
                    
                    paint = {{
                        "line-color": "#888",
                        "line-width": 8
                    }}
                    >
                    {/* <Feature coordinates={[-0.481747846041145, 51.3233379650232]}/> */}
                    </Layer>
                </Map>
            </div>
        )
    // }
    }
  }
  export default TrackingContent;