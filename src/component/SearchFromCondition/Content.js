import React, { Component } from 'react';
import { Menu, Dropdown, Icon , Button ,Slider, InputNumber, Col, Row, Card, Table, Input} from 'antd';
import axios from 'axios'
import {predictService,dataService, modelList} from '../../data/DataService';
import Loader from 'react-loader-spinner'
class SearchingContent extends Component {
  
    constructor(props){
        super(props);
        this.state = {
          camID: 0,
          // autocompleteData: [
          //   'Toyota Camry','Toyota Prius','Toyota Vios','Toyota Corolla','Toyota Corolla Altis','Toyota Camry Hybrid','Toyota Yaris','BMW Series1',
          //   'BMW Series3','BMW Series4','BMW Series5','BMW Series6','BMW Series','Mazda Mazda2','Mazda Mazda3','Mini Clubman','Mini Convertible','Mini Countryman',
          //   'Ford Fiesta','Ford Focus','Nissan Almera','Nissan March','Nissan Note','Nissan Sylphy','Nissan Teana','Volvo S60','Volvo S90','Volvo V40',
          //   'Volvo V60','Volvo V90','Toyota Revo','Isuzu D-MAX','Nissan Navara','Mitsubishi Triton','Ford Ranger','Chevrolet Colorado','Toyota Fortuner',
          //   'Porsche Macan','Porsche Cayenne','Chevrolet Captiva','Chevrolet Trailblazer','Ford Everest','Ford EcoSport','Honda BR-V','Honda CR-V','Honda HR-V',
          //   'BMW X1','BMW X2','BMW X3','BMW X4','BMW X5','BMW X6','Nissan Juke','Nissan Terra','Mazda CX-3','Mazda CX-5'
          // ]
          carColor: 'เลือกสีรถ',
          provinceLP:'เลือกจังหวัด',
          data: '',
        }
        this.colorSelected = this.colorSelected.bind(this)
        this.provinceSelected = this.provinceSelected.bind(this)
        this.submitSearch = this.submitSearch.bind(this)
      }
      onChangeCamID = (value) => {
        this.setState({
          camID: value,
        });
        // console.log('camID>>>>',this.state.camID)
      }
    
      colorSelected(e) {
        this.setState({
          carColor : e.key
        })
        // console.log('carColor>>>>',this.state.carColor)
      }
    
      provinceSelected(e) {
        this.setState({
          provinceLP : e.key
        })
        // console.log('provinceLP>>>>',this.state.provinceLP)
      }
    
      submitSearch(){
        const serviceurl='http://localhost:5000'
        const urls =serviceurl + '/search'
        let query = {} 
        
        if(this.state.camID !== 0){
          query.camID = this.state.camID
        }
        if(this.state.provinceLP !== 'เลือกจังหวัด'){
          query.province = this.state.provinceLP
        }
        if(this.state.carColor !== 'เลือกสีรถ'){
          query.carColor = this.state.carColor
        }
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

    

      render() {
        const { camID } = this.state
        const menu = (
          <Menu onClick={this.colorSelected}>
            <Menu.Item key="Aluminum">Aluminum</Menu.Item>
            <Menu.Item key="Black">Black</Menu.Item>
            <Menu.Item key="Blue">Blue</Menu.Item>
            <Menu.Item key="Brown">Brown</Menu.Item>
            <Menu.Item key="Bronze">Bronze</Menu.Item>
            <Menu.Item key="Copper">Copper</Menu.Item>
            <Menu.Item key="Cream">Cream</Menu.Item>
            <Menu.Item key="Gold">Gold</Menu.Item>
            <Menu.Item key="Gray">Gray</Menu.Item>
            <Menu.Item key="Green">Green</Menu.Item>
            <Menu.Item key="Metallic">Metallic</Menu.Item>
            <Menu.Item key="Navy">Navy</Menu.Item>
            <Menu.Item key="Orange">Orange</Menu.Item>
            <Menu.Item key="Pink">Pink</Menu.Item>
            <Menu.Item key="Purple">Purple</Menu.Item>
            <Menu.Item key="Red">Red</Menu.Item>
            <Menu.Item key="Rose">Rose</Menu.Item>
            <Menu.Item key="Silver">Silver</Menu.Item>
            <Menu.Item key="White">White</Menu.Item>
            <Menu.Item key="Yellow">Yellow</Menu.Item>
          </Menu>
          )
        const province = (
          <Menu onClick={this.provinceSelected}>
            <Menu.Item key="กระบี่">กระบี่</Menu.Item>
            <Menu.Item key="กรุงเทพมหานคร">กรุงเทพมหานคร</Menu.Item>
            <Menu.Item key="กาญจนบุรี">กาญจนบุรี</Menu.Item>
            <Menu.Item key="กาฬสินธุ์">กาฬสินธุ์</Menu.Item>
            <Menu.Item key="กำแพงเพชร">กำแพงเพชร</Menu.Item>
            <Menu.Item key="ขอนแก่น">ขอนแก่น</Menu.Item>
            <Menu.Item key="จันทบุรี">จันทบุรี</Menu.Item>
            <Menu.Item key="ฉะเชิงเทรา">ฉะเชิงเทรา</Menu.Item>
            <Menu.Item key="ชลบุรี">ชลบุรี</Menu.Item>
            <Menu.Item key="ชัยนาท">ชัยนาท</Menu.Item>
            <Menu.Item key="ชัยภูมิ">ชัยภูมิ</Menu.Item>
            <Menu.Item key="ชุมพร">ชุมพร</Menu.Item>
            <Menu.Item key="เชียงราย">เชียงราย</Menu.Item>
            <Menu.Item key="เชียงใหม่">เชียงใหม่</Menu.Item>
            <Menu.Item key="ตรัง">ตรัง</Menu.Item>
            <Menu.Item key="ตราด">ตราด</Menu.Item>
            <Menu.Item key="ตาก">ตาก</Menu.Item>
            <Menu.Item key="นครนายก">นครนายก</Menu.Item>
            <Menu.Item key="นครปฐม">นครปฐม</Menu.Item>
            <Menu.Item key="นครพนม">นครพนม</Menu.Item>
            <Menu.Item key="นครราชสีมา">นครราชสีมา</Menu.Item>
            <Menu.Item key="นครศรีธรรมราช">นครศรีธรรมราช</Menu.Item>
            <Menu.Item key="นครสวรรค์">นครสวรรค์</Menu.Item>
            <Menu.Item key="นนทบุรี">นนทบุรี</Menu.Item>
            <Menu.Item key="นราธิวาส">นราธิวาส</Menu.Item>
            <Menu.Item key="น่าน">น่าน</Menu.Item>
            <Menu.Item key="บุรีรัมย์">บุรีรัมย์</Menu.Item>
            <Menu.Item key="ปทุมธานี">ปทุมธานี</Menu.Item>
            <Menu.Item key="ประจวบคีรีขันธ์">ประจวบคีรีขันธ์</Menu.Item>
            <Menu.Item key="ปราจีนบุรี">ปราจีนบุรี</Menu.Item>
            <Menu.Item key="ปัตตานี">ปัตตานี</Menu.Item>
            <Menu.Item key="พระนครศรีอยุธยา">พระนครศรีอยุธยา</Menu.Item>
            <Menu.Item key="พะเยา">พะเยา</Menu.Item>
            <Menu.Item key="พังงา">พังงา</Menu.Item>
            <Menu.Item key="พัทลุง">พัทลุง</Menu.Item>
            <Menu.Item key="พิจิตร">พิจิตร</Menu.Item>
            <Menu.Item key="พิษณุโลก">พิษณุโลก</Menu.Item>
            <Menu.Item key="เพชรบุรี">เพชรบุรี</Menu.Item>
            <Menu.Item key="เพชรบูรณ์">เพชรบูรณ์</Menu.Item>
            <Menu.Item key="แพร่">แพร่</Menu.Item>
            <Menu.Item key="ภูเก็ต">ภูเก็ต</Menu.Item>
            <Menu.Item key="มหาสารคาม">มหาสารคาม</Menu.Item>
            <Menu.Item key="มุกดาหาร">มุกดาหาร</Menu.Item>
            <Menu.Item key="แม่ฮ่องสอน">แม่ฮ่องสอน</Menu.Item>
            <Menu.Item key="ยโสธร">ยโสธร</Menu.Item>
            <Menu.Item key="ยะลา">ยะลา</Menu.Item>
            <Menu.Item key="ร้อยเอ็ด">ร้อยเอ็ด</Menu.Item>
            <Menu.Item key="ระนอง">ระนอง</Menu.Item>
            <Menu.Item key="ระยอง">ระยอง</Menu.Item>
            <Menu.Item key="ราชบุรี">ราชบุรี</Menu.Item>
            <Menu.Item key="ลพบุรี">ลพบุรี</Menu.Item>
            <Menu.Item key="เลย">เลย</Menu.Item>
            <Menu.Item key="ลำปาง">ลำปาง</Menu.Item>
            <Menu.Item key="ลำพูน">ลำพูน</Menu.Item>
            <Menu.Item key="ศีรสะเกษ">ศีรสะเกษ</Menu.Item>
            <Menu.Item key="สกลนคร">สกลนคร</Menu.Item>
            <Menu.Item key="สงขลา">สงขลา</Menu.Item>
            <Menu.Item key="สตูล">สตูล</Menu.Item>
            <Menu.Item key="สมุทรปราการ">สมุทรปราการ</Menu.Item>
            <Menu.Item key="สมุทรสงคราม">สมุทรสงคราม</Menu.Item>
            <Menu.Item key="สมุทรสาคร">สมุทรสาคร</Menu.Item>
            <Menu.Item key="สระแก้ว">สระแก้ว</Menu.Item>
            <Menu.Item key="สระบุรี">สระบุรี</Menu.Item>
            <Menu.Item key="สิงห์บุรี">สิงห์บุรี</Menu.Item>
            <Menu.Item key="สุโขทัย">สุโขทัย</Menu.Item>
            <Menu.Item key="สุพรรณบุรี">สุพรรณบุรี</Menu.Item>
            <Menu.Item key="สุราษฎร์ธานี">สุราษฎร์ธานี</Menu.Item>
            <Menu.Item key="สุรินทร์">สุรินทร์</Menu.Item>
            <Menu.Item key="หนองคาย">หนองคาย</Menu.Item>
            <Menu.Item key="หนองบัวลำภู">หนองบัวลำภู</Menu.Item>
            <Menu.Item key="อ่างทอง">อ่างทอง</Menu.Item>
            <Menu.Item key="อำนาจเจริญ">อำนาจเจริญ</Menu.Item>
            <Menu.Item key="อุดรธานี">อุดรธานี</Menu.Item>
            <Menu.Item key="อุตรดิตถ์">อุตรดิตถ์</Menu.Item>
            <Menu.Item key="อุทัยธานี">อุทัยธานี</Menu.Item>
            <Menu.Item key="อุบลราชธานี">อุบลราชธานี</Menu.Item>
    
          </Menu>
        )
    
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
        return (
          <div>
          
          <Card style={{textAlign:'center',background:'#fde869'}}>
           <Row>
            <Col span={4}/>
            <Col span={4} ><p style= {{marginTop:'10px',color:'#000000'}}>Camera ID</p> </Col>
            <Col span={8}>
              <Slider
                min={0}
                max={50}
                onChange={this.onChangeCamID}
                value={typeof camID === 'number' ? camID : 0}
              />
            </Col>
            <Col span={4} >
              <InputNumber
                min={0}
                max={50}
                style={{ textAlign: 'center' }}
                value={camID}
                onChange={this.onChangeCamID}
              />
            </Col>
          </Row>
          </Card>

          <Card style={{textAlign:'center',background:'#fde869'}}>
              <span style = {{color:'#000000'}}>สีรถ
              <Dropdown overlay={menu} trigger={['click']}>
                <Button style={{ marginLeft: 8 }}>
                  {this.state.carColor} <Icon type="down" />
                </Button>
              </Dropdown>
            </span>
          </Card>

          <Card style={{textAlign:'center',background:'#fde869'}}>
            <span style = {{color:'#000000'}}>จังหวัด
              <Dropdown overlay={province} trigger={['click']}>
                <Button style={{ marginLeft: 8 }}>
                  {this.state.provinceLP} <Icon type="down" />
                </Button>
              </Dropdown>
            </span>
          </Card>

          {/* LP Input ******************/}
          {/* <Card style={{textAlign:'center',background:'#fde869'}}>
            <Row style = {{color:'#000000'}}>
              <Col span={10}></Col>
              <Col span={2} style={{marginTop:'7px'}}>ป้ายทะเบียน</Col>
              <Col span={2}>
                <Input size="large" placeholder="Ex : กข 1234" style={{width:'100%',padding:'1%'}} onChange={this.onChangeLP}/>
              </Col>
              <Col span={10}></Col>  
            </Row>
          </Card> */}
          
          <Row style={{paddingTop:'2%',paddingBottom:'2%',background:'#565759'}}>
            <Col span={8}/>
            <Col span={8} > 
              <Button block onClick={this.submitSearch}>Search</Button>
            </Col>
            <Col span={8}/>
          </Row>
    
          <Table style={{textAlign:'center'}} columns={columns} dataSource={this.state.data} pagination={false} size="small" />
    
    
          
          </div>
        );
      }
}

export default SearchingContent;
