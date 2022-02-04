import React, { Component } from 'react'
import { Button, Form, Container, Row, Col,Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default class Login extends Component {
  state = {
    useremail: "",
    userpassword: "",
    errmsg:"",
}

isFromEmty = ({useremail, userpassword}) =>{
    if(!useremail.length || !userpassword.length){
        this.setState({errmsg:"fill form"})
    }else if(userpassword.length < 8){
        this.setState({errmsg:"mimimum 8 Character"})
    }else{
        return true
    }
}



handleChange = (e) =>{
    this.setState({[e.target.name]: e.target.value})
}

handleSubmit = (e)=>{
    e.preventDefault();
    const auth = getAuth();
    if(this.isFromEmty(this.state)){
      signInWithEmailAndPassword(auth, this.state.useremail, this .state.userpassword)
      .then((userCredential)=>{
        console.log(userCredential)
      }).catch((error) => {
        const errorCode = error.code;
        if(errorCode.includes("user")){
          this.setState({errmsg: "Email Does not Match"})
      }else if(errorCode.includes("wrong-password")){
        this.setState({errmsg: "wrong password "})
      }
      });   
            }
        }

  render() {
    const {useremail,userpassword,errmsg} = this.state
    return (
      <div>
      <Container style={{marginTop:"150px"}}>
          <Row className='justify-content-lg-center text-center mt-5'>
              <Col lg="4">
                      <h2>Login </h2>
                      {errmsg ? <Alert variant="danger">
                      <Alert.Heading>{errmsg}</Alert.Heading>
                  </Alert>: ""}

                  <Form onSubmit={this.handleSubmit}>
                      
                      <Form.Group className="mb-3 mt-3">
                          <Form.Control type="email" name='useremail' placeholder="Enter Your Email" onChange={this.handleChange} value={useremail} />
                      </Form.Group>
                      <Form.Group className="mb-3 mt-3">
                          <Form.Control type="password" name='userpassword' placeholder="Enter Your Password" onChange={this.handleChange} value={userpassword} />
                      </Form.Group>
                      <Button variant="primary" type="submit">Submit</Button>
                  </Form>
                  <span>Don't have An Account <Link to="/register">Register Now</Link> </span>
              </Col>
          </Row>
      </Container>
  </div>
    )
  }
}
