import React , { Component } from 'react'
import { connect } from 'react-redux'
import { Route , Redirect } from "react-router-dom"


class PrivateRoute extends Component {
    render(){
        const { component : Component , ...rest } = this.props
        const { isAuthenticated} = this.props.user
        return (
            <Route {...rest } render = {(props) => {
                
                if (isAuthenticated) {
                    return <Component{...props}/>
                }
               else {
                    return <Redirect to="/login"/>
                }
            }}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      user: state.login,
      shouts:state.shouts
    };
  };
  

export default connect(mapStateToProps)(PrivateRoute)