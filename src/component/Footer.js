import React, { Component } from 'react'

class Footer extends Component{
    render(){
        var mystyle={
            height:'100%',
            padding:20,
            fontSize:30,
            color:'#ed7a57',
            background:'#DCDCDC',
            textAlign:'center'
        }
        
      return(
        
        <div style={mystyle}>
            Footer
        </div>
      );
    }
  }
  export default Footer;