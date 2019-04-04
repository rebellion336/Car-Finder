import React, { Component } from 'react'
import axios from 'axios'
import ReactMapboxGl, { Layer, Feature ,Source ,GeoJSONLayer } from "react-mapbox-gl";
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
            path: [],
            source : {
              "type": "geojson",
              "data": {
                  "type": "Feature",
                  "properties": {},
                  "geometry": {
                      "type": "LineString",
                      "coordinates": []
                  }
              }
            },
        };
        this.submitSearch = this.submitSearch.bind(this)
    }
    onChangeLP = (e) => {
    
        this.setState({
          LP: e.target.value,
        });
        // console.log('licensePlate>>>>',this.state.LP)
      }


    // componentDidUpdate(prevProps, prevState){
    //   console.log('prevState',prevState)
    //   console.log('thisState',this.state)
    //   if(this.state.path !== prevState.path){
    //     this.setState({
    //       source : {
    //         "type": "geojson",
    //         "data": {
    //             "type": "Feature",
    //             "properties": {},
    //             "geometry": {
    //                 "type": "LineString",
    //                 "coordinates": [this.state.path]
    //             }
    //         }
    //       }
    //     })
    //     console.log('source',this.state.source)
    //   }
    // }

    componentWillUpdate(nextProps, nextState) {
      const { map, path } = nextState;
      if (map) {
        console.log('pathInWillUpdate',path)
        //map.getSource('STEST').setData(path);
      }
    }

    onStyleLoad = (map, e) => {
      this.setState( {map} );
      console.log('map',map)
    }

    loadSource(e){
      console.log('eOnload',e)
      this.setState({
        source : {
          "type": "geojson",
          "data": {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "LineString",
                  "coordinates": this.state.path
              }
          }
        } 
      })
    }
    
    async submitSearch(){
        const serviceurl='http://localhost:5000'
        const urls =serviceurl + '/search'
        let query = {} 
        
        
        if(this.state.LP !== ''){
          query.licensePlates = this.state.LP
        }
        
        const body = JSON.stringify(query)
        console.log(body)
        await axios({
            method : 'post',
            headers : {
                'Access-Control-Allow-Origin' : '*',
                'Content-Type' : 'application/json'
            },
            data : body,
            url : urls,
        }).then(res => {
          console.log(res.data)
          let route_data = [];
          for(let i = 0; i < res.data.length; i++){
            // console.log([res.data[i].lng, res.data[i].lat])
            route_data.push([res.data[i].lng, res.data[i].lat]);
          }
          console.log("route_data>>",route_data)
          this.setState({
            path : route_data,
            data: res.data,
            source: {
              "type": "geojson",
              "data": {
                  "type": "Feature",
                  "properties": {},
                  "geometry": {
                      "type": "LineString",
                      "coordinates": route_data
                  }
              }
            }
            
          })
        });
      }
    render(){
      console.log('path',this.state.path)
      console.log('source reder',this.state.source)
        let source = {
          "type": "geojson",
          "data": {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "LineString",
                  "coordinates": [
                    [100.410129, 13.640301999999998],
                    [100.574999, 13.839751000000001],
                    [100.474152, 13.729420999999999],
                    [100.530919, 13.80625],
                    [100.46935, 13.754860999999998]
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
                }}
                onStyleLoad={this.onStyleLoad}
                >
                <Source id="STEST" 
                geoJsonSource={this.state.source}
                />
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
                    </Layer>
                </Map>
            </div>
        )
    // }
    }
  }
  export default TrackingContent;