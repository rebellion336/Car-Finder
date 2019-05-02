import React, { Component } from "react";
import axios from "axios";
import ReactMapboxGl, {
  Layer,
  Feature,
  Source,
  GeoJSONLayer
} from "react-mapbox-gl";
import {
  Menu,
  Dropdown,
  Icon,
  Button,
  Slider,
  InputNumber,
  Col,
  Row,
  Card,
  Table,
  Input
} from "antd";
import {
  verifymodelService,
  modelList,
  createmodelService
} from "../../data/DataService";
import Loader from "react-loader-spinner";
// const geojson = require('./geojson.json');

const lineConordinates = [
  [100.410129, 13.640301999999998],
  [100.574999, 13.839751000000001],
  [100.474152, 13.729420999999999],
  [100.530919, 13.80625],
  [100.46935, 13.754860999999998]
];

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoidGluZ2x5MzEwMSIsImEiOiJjanQzMW1ld3gxOTl4M3ludnJ2dTY3bWwxIn0.iVnskrNVRBQbx2mj7BLFJA"
});

class TrackingContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LP: "",
      data: "",
      path: []
    };
    this.submitSearch = this.submitSearch.bind(this);
  }
  onChangeLP = e => {
    this.setState({
      LP: e.target.value
    });
  };

  componentWillUpdate(nextProps, nextState) {
    // console.log("Geojson Req:", Geojson2);
    const { map, path } = nextState;
    if (map) {
      console.log("pathInWillUpdate", path);
    }
  }

  onStyleLoad = (map, e) => {
    this.setState({ map });
    console.log("map", map);
  };

  async submitSearch() {
    const serviceurl = "http://localhost:5000";
    const urls = serviceurl + "/search";
    let query = {};

    if (this.state.LP !== "") {
      query.licensePlates = this.state.LP;
    }

    const body = JSON.stringify(query);
    console.log(body);
    await axios({
      method: "post",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      data: body,
      url: urls
    }).then(res => {
      console.log(res.data);
      let route_data = [];
      for (let i = 0; i < res.data.length; i++) {
        // console.log([res.data[i].lng, res.data[i].lat])
        route_data.push([res.data[i].lng, res.data[i].lat]);
      }
      console.log("route_data>>", route_data);
      this.setState({
        path: route_data,
        data: res.data
      });
    });
  }
  render() {
    let lineLayer = (
      <Layer type="line">
        <Feature coordinates={this.state.path} />
      </Layer>
    );
    let pointLayer = this.state.path.map(point => {
      return (
        <Layer type="circle">
          <Feature coordinates={point} />
        </Layer>
      );
    });
    let renderMap = (
      <div>
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          center={[100.523186, 13.736717]}
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}
          onStyleLoad={this.onStyleLoad}
        >
          {lineLayer}
          {pointLayer}
        </Map>
      </div>
    );
    console.log("path", this.state.path);

    const columns = [
      {
        title: "ป้ายทะเบียน",
        dataIndex: "licensePlates"
      },
      {
        title: "จังหวัด",
        dataIndex: "province"
      },
      {
        title: "ยี่ห้อ",
        dataIndex: "carBrand"
      },
      {
        title: "สีรถ",
        dataIndex: "carColor"
      },
      {
        title: "ประเภทรถ",
        dataIndex: "carType"
      },
      {
        title: "วันที่จับภาพ",
        dataIndex: "datetime"
      },
      {
        title: "หมายเลขกล้องที่จับภาพ",
        dataIndex: "camID"
      }
    ];
    return (
      <div>
        <Card style={{ textAlign: "center", background: "#fde869" }}>
          <Row style={{ color: "#000000" }}>
            <Col span={10} />
            <Col span={2} style={{ marginTop: "7px" }}>
              ป้ายทะเบียน
            </Col>
            <Col span={2}>
              <Input
                size="large"
                placeholder="Ex : กข 1234"
                style={{ width: "100%", padding: "1%" }}
                onChange={this.onChangeLP}
              />
            </Col>
            <Col span={10} />
          </Row>
        </Card>

        <Row
          style={{
            paddingTop: "2%",
            paddingBottom: "2%",
            background: "#565759"
          }}
        >
          <Col span={8} />
          <Col span={8}>
            <Button block onClick={this.submitSearch}>
              Search
            </Button>
          </Col>
          <Col span={8} />
        </Row>

        <Table
          style={{ textAlign: "center" }}
          columns={columns}
          dataSource={this.state.data}
          pagination={false}
          size="small"
        />
        {renderMap}
      </div>
    );
    // }
  }
}
export default TrackingContent;
