
import GeneralSearching from './component/SearchFromCondition/Page';
import LPSearching from './component/SearchFromLP/Page';
import personlogo from './img/person.png'
import React from "react";
import { Button,Input , Icon, Col,Row,message} from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import {loginService} from './data/DataService'


const msgClicked = (msg,status) => {
    //1 success
    //2 info
    //3 warning
    //4 error
    if(status === 1){
        message.success(msg)
    }else if (status === 2){
        message.info(msg)
    }else if (status === 3){
        message.warning(msg)
    }else{
        message.error(msg)
    }
    
  };
function AuthenticateLogin() {
    
    console.log('isauthen false:',loginAuthen.isAuthenticated)
    // if(this.state.loginSuccess && this.state.redirectToReferrer){
    //   return (
    //     <Router>
    //         <div > 
    //         <Route path="/public" component={Public} />
    //         <Route path="/login" component={Login} />
            
    //         <PrivateRoute exact path="/Report" component={Report} />
    //         <PrivateRoute exact path="/Addmodel" component={AddModel} />
    //         <AuthButton /> 
    //         </div>
    //     </Router>
    //     );
    // }else{
      return (
        <Router>
            <div > 
            
            <ul style ={{color:'#fde869'}}><Link to ="/GeneralSearching"> Login Site</Link></ul>
            <Route path="/public" component={Public} />
            <Route path="/login" component={Login} />
            
            <PrivateRoute exact path="/GeneralSearching" component={GeneralSearching} />
            <PrivateRoute exact path="/LicensePlateSearching" component={LPSearching} />
            <AuthButton /> 
            </div>
        </Router>
        );
    // }
    
    
  
}

const AuthButton = withRouter( 
    ({ history }) => 
    loginAuthen.isAuthenticated ? 
        ( <p> Welcome!{" "} 
            <button onClick={() => 
            { 
                loginAuthen.signout(() => history.push("/login")); 
            }
        }> 
            Sign out 
        </button> 
        </p> ) : 
        ( <p></p> )
);

const loginAuthen = {
    isAuthenticated: false,
    authenticate(cb,state) {
        if(state){
            this.isAuthenticated = true
        }
        else{
            this.isAuthenticated = false;
            
        }
        setTimeout(cb, 100); 
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};



function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        loginAuthen.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

function Public() {
    return <h3>Public</h3>;
}

function Protected() {
    return <h3>Protected</h3>;
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            username:'',
            password:'',
            loginSuccess:false,
            redirectToReferrer: false ,
            status : false
        }
        this.setStatus=this.setStatus.bind(this)
    }
    
    setStatus(newStatus){
        this.setState({status:newStatus})
    }

    onChangeUser = (e) => {
        this.setState({username: e.target.value})
    }
    
    onChangePassword = (e) => {
        this.setState({password: e.target.value})
    }

    logout = () => {
        loginAuthen.authenticate(() => {
        this.setState({ redirectToReferrer: false });
        });
    };

    testlogin =async () => {
            const result = await loginService(this.state.username,this.state.password)
            console.log('result Testlogin',result)
            if(result === true){
                this.setState({ 
                    loginSuccess : true
                });
                loginAuthen.authenticate(async () => {
                    await msgClicked('Login Complete.',1)
                    await this.setState({ redirectToReferrer: true });
                },this.state.loginSuccess);

            }else{
                msgClicked('Invalid Account.',4)
            }
        
        
    }

    render() {
        let { from } = this.props.location.state || { from: { pathname: "/login" } };
        let { redirectToReferrer } = this.state;

        if (redirectToReferrer) return <Redirect to={from} />;

        console.log('statusaaaa',loginAuthen.isAuthenticated)

        return (
            <div style={{background: '#ffffff'}}>
                <Row style={{position:'fixed',height:'200px',background:'#fde869'}}></Row>
                <Row>
                    <Col span={7} style={{background:'#fde869',height:'650px'}}>
                    </Col>
                    <Col span={10} style={{textAlign:'center',marginLeft:'auto',marginRight:'auto',height:'650px'}}>
                        <div style={{marginTop:'10%',marginLeft:'auto',marginRight:'auto',width:'80%',heigh:'60%',color:'#565759',fontSize:'80px',textAlign:'center',fontWeight:'bold',padding:'3%'}}>
                            Car Finder
                        </div>
                        <div style={{marginTop:'10%',marginLeft:'auto',marginRight:'auto',heigh:'60%',background:'#ffffff',padding:'3%'}}>
                            <img src = {personlogo} alt={"personlogo"} style={{width:'100px'}}  ></img>  
                        </div>
                        {/* Username */}
                        <Input 
                            size="large" 
                            placeholder="Username" 
                            prefix={<Icon type="user" style={{ color:'rgba(0,0,0,.25)',marginRight:'1%'}} />} 
                            onChange={this.onChangeUser} 
                            style={{ fontSize: '20px', marginTop: '5%', width:'80%'  }}
                        />
                        <br/>
                        {/* Password */}
                        <Input 
                            size="large" 
                            placeholder="Password" 
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)',marginRight:'1%' }} />} 
                            onChange={this.onChangePassword} 
                            type="password"  
                            style={{ fontSize: '20px', marginTop: '3%', width:'80%' }}/> 
                        <br/>
                        <Button size="large" type="primary" 
                            onClick={
                                async()=>{
                                    if(this.state.username.length == 0 && this.state.password.length == 0){
                                        msgClicked('Please enter username and password.',3)
                                    }else if(this.state.username.length == 0){
                                        msgClicked('Please enter username.',3)
                                    }else if(this.state.password.length == 0){
                                        msgClicked('Please enter password.',3)
                                    }else{
                                        await msgClicked('Verify Account.',2)
                                    }
                                    await this.testlogin()
                                    await console.log('onClicklogin')    
                                }
                            } 
                            style={{marginTop:'3%',marginBottom:'3%'}}> Log in </Button>
                        <br/>
                    </Col>
                    <Col span={7} style={{background:'#fde869',height:'650px'}}></Col>
                </Row>
                <Row style={{height:'200px',background:'#fde869'}}>
                    
                </Row>
            </div>
        );
    }
}

export default AuthenticateLogin;