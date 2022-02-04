import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap';
import {signOut,getAuth} from "../../firebase"

export default class UserPanel extends Component {
    handleLogOut = ()=>{
        const auth = getAuth();
        signOut(auth).then(() => {
        console.log("signout")
        }).catch((error) => {
            console.log(error)
        });
    }

  render() {
    return (
      <div>
          <h2 style={{marginTop:"40px"}}>Mern Adda</h2>
          <Dropdown className="d-inline mx-2">
            <Dropdown.Toggle style={{backgroundColor:"gray"}}>
               {this.props.name}
            </Dropdown.Toggle>

            <Dropdown.Menu>
            <Dropdown.Item href="#" disabled={true}>Razib</Dropdown.Item>
            <Dropdown.Item href="#">Change Profile Picture</Dropdown.Item>
            <Dropdown.Item href="#" onClick={this.handleLogOut}>Log Out</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
          
      </div>
    )
  }
}
