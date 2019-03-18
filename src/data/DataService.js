import axios from 'axios'

const serviceurl='https://localhost:5000'

export async function loginService(user,pass){
    // const urls =serviceurl+'/login'
    // const bodys = {
    //     "username" :user,
    //     "password": pass
    // }
    // const test = await axios({
    //     method:'post',
    //     headers: {
    //         'Access-Control-Allow-Origin': '*',
    //         'Content-Type': 'application/json'
    //     },
    //     data : bodys,
    //     url: urls,
    // }).then(res=>{
    //     console.log('res',res.data)
    //     // setStatus(res.data.loginStatus)
    //     return res.data
    // });   
    // console.log('test dataService',test)
    // return test.loginStatus
    return true
}
//list of Machine learning 
export function modelList(setList){
    const urls =serviceurl +'/ModelList'
    axios({
        method: 'get',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        url: urls,
    }).then(res=>{
        if(res.status === 400){
            return 'Failed'
        }
        else{
            // console.log('modelList res,res.data,model:', res, res.data, model)
            setList(res.data);
        } 
    });   
}
//fetch Error of training model
export function verifymodelService(setMsgVerify, setLoader, setMape, product){
    const urls =serviceurl + '/Verifymodel'
    const bodys = {
        "product" : product
    }
    // console.log(bodys)
    axios({
        method : 'post',
        headers : {
            'Access-Control-Allow-Origin' : '*',
            'Content-Type' : 'application/json'
        },
        data : bodys,
        url : urls,
    }).then(res => {
        if(typeof res.data === 'string' || res.data instanceof String){
            // console.log(typeof res.data === 'string',res.data instanceof String)
            // msgClicked(res.data)
            setMsgVerify(res.data)
            setLoader('false');
        } else {
            // console.log('verifymodelService:',res.data,typeof res.data)
            setMape(res.data, product);
            setMsgVerify('Training Model Complete.')
            setLoader('false');
        }
    });      
}
//confirm create model
export function createmodelService(setMsgCreate, setMsgLoader, product, train_ratio){
    const urls = serviceurl + '/Createmodel'
    const bodys = {
        "product" : product,
        "train_ratio" : train_ratio
    }
    // console.log(bodys)
    axios({
        method : 'post',
        headers : {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        data : bodys,
        url : urls,
    })
    .then(res => {
        // console.log(typeof res.data)
        // msgClicked(res.data)
        setMsgCreate(res.data)
        setMsgLoader('false');

    });
}
//Result to dashboard
export function predictService(setData, matno, mateng){
    const urls =serviceurl+'/Predict'
    const bodys = {
        "product" : matno
    }
    // console.log(bodys)
    var arr = [];
    var future_arr = [];
    axios({
        method : 'post',
        headers : {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }, 
        data : bodys,
        url : urls,
    }).then(res => {
        // console.log('res:',res.data)
        // console.log('typeof res',typeof res.data)
        // console.log('res:',res)
        console.log('Date',typeof res.data[0].Date)
        arr.push(["Date","Actual","Forecast"])
        future_arr.push(["Date","Forecast"])
        for(var i = 0; i < res.data.length; i++){
            // console.log([res.data[i].Date,res.data[i].Actual,res.data[i].Predict])
            if(i>res.data.length-4){
                future_arr.push([res.data[i].Date, res.data[i].Predict])
            }
            arr.push([res.data[i].Date, res.data[i].Actual, res.data[i].Predict])
        }
        setData(arr,future_arr,res.data,matno,mateng);
    });
}

export function dataService(setData,product){
    const urls = serviceurl+'/Data'
    const bodys = {
        "product" : product
    }
    // console.log(bodys)
    var arr = [];
    axios({
        method : 'post',
        headers : {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        data : bodys,
        url : urls,
    }).then(res => {
        // console.log('res:',res)
        arr.push(["Date","Actual"])
        for(var i = 0; i < res.data.length; i++){
            arr.push([res.data[i].Date, res.data[i].Volume])
        }
        setData(arr, res.data, product);
    });
}

