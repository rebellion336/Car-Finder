import React, { Component } from 'react'

class Header extends Component{
  
    render(){
      const mystyle={
        background:'#ffffff',
        color:'#565759',
        fontSize:'80px',
        textAlign:'center',
        fontWeight:'bold'
      }
      
      return(
        <div style={{background:'#ffffff',color:'#565759',fontSize:'80px',textAlign:'center',fontWeight:'bold'}}>Car Finder</div>
      );
    }
  }
  export default Header;