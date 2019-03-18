import stylesheet from 'antd/dist/antd.min.css'
import PropTypes from 'prop-types'
import React from 'react'


const LoginLayout = ({ children }) => {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        backgroundColor:'#c6c6c6'
        
      }}
    >
      <style jsx global>{`
        body,
        html {
          height: 100%;
          margin: 0;
          width: 100%;
          
        }
        :global(#__next) {
          height: 100%;
        }
        
      `}</style>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      {children}
    </div>
  )
}
LoginLayout.propTypes = {
  children: PropTypes.node,
}
LoginLayout.defaultProps = {
  children: null, // render nothing
}

export default LoginLayout