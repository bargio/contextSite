import Loader from 'react-loader-spinner'
import React from 'react'
import LoadingOverlay from 'react-loading-overlay'

 export default class MyLoader extends React.Component {
  //other logic

    constructor(props){
        super(props)
        this.state={
            show:true
        }
    }

    render() {
     return(
        <LoadingOverlay
        active={true}
        spinner={
        <Loader
            type="BallTriangle"
            color="#00BFFF"
            height={100}
            width={100}
         />}
      >
          {this.props.child}
      </LoadingOverlay>
     );
    }


 }