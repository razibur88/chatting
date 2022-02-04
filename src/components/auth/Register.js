import React, { Component } from 'react'
import { Button, Form, Container, Row, Col,Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {getAuth, createUserWithEmailAndPassword,updateProfile,getDatabase, ref, set} from "../../firebase";

export default class Register extends Component {
    state = {
        username: "",
        useremail: "",
        userpassword: "",
        conpassword: "",
        errmsg:"",
        succMass:""
    }

    isFromEmty = ({username, useremail, userpassword, conpassword}) =>{
        if(!username.length || !useremail.length || !userpassword.length || !conpassword.length){
            this.setState({errmsg:"fill form"})
        }else if(userpassword.length < 8 || conpassword.length < 8){
            this.setState({errmsg:"mimimum 8 Character"})
        }else if(userpassword !== conpassword){
            this.setState({errmsg:"password does not matching"})
        }else{
            return true
        }
    }
    
   

    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        if(this.isFromEmty(this.state)){
                const auth = getAuth();
                createUserWithEmailAndPassword(auth, this.state.useremail, this.state.userpassword)
                .then((userCredential) => {
                    updateProfile(auth.currentUser,{
                        displayName:this.state.username
                    }).then(()=>{
                        this.writeUserData(userCredential)
                    })
                    .then(()=>{
                        this.setState({username: ""})
                        this.setState({useremail: ""})
                        this.setState({userpassword: ""})
                        this.setState({conpassword: ""})
                        this.setState({succMass: "Account Create Successfully"})
                    }).catch((error)=>{
                        const errorCode = error.code;
                        if(errorCode){
                            this.setState({errmsg: "user name not valid"})
                        }
                    })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    if(errorCode.includes("email")){
                        this.setState({errmsg: "already email in use"})
                    }
                });
                }
            }

         writeUserData = (user)=> {
                const db = getDatabase();
                set(ref(db, 'users/' + user.user.uid), {
                  username: this.state.username,
                });
              }


  render() {
      const {username, useremail, userpassword, conpassword, errmsg, succMass} = this.state
    return (
        <div>
            <Container style={{marginTop:"150px"}}>
                <Row className='justify-content-lg-center text-center mt-5'>
                    <Col lg="4">
                            <h2>Registration Form</h2>
                            {errmsg ? <Alert variant="danger">
                            <Alert.Heading>{errmsg}</Alert.Heading>
                        </Alert>: ""}
                            {succMass ? <Alert variant="success">
                            <Alert.Heading>{succMass}</Alert.Heading>
                        </Alert>: ""}
      
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3 mt-3">
                                <Form.Control type="Name" name='username' placeholder="Enter Your Name" onChange={this.handleChange} value={username} />
                            </Form.Group>
                            <Form.Group className="mb-3 mt-3">
                                <Form.Control type="email" name='useremail' placeholder="Enter Your Email" onChange={this.handleChange} value={useremail} />
                            </Form.Group>
                            <Form.Group className="mb-3 mt-3">
                                <Form.Control type="password" name='userpassword' placeholder="Enter Your Password" onChange={this.handleChange} value={userpassword} />
                            </Form.Group>
                            <Form.Group className="mb-3 mt-3">
                                <Form.Control type="password" name='conpassword' placeholder="Enter Your Confirm Password" onChange={this.handleChange} value={conpassword} />
                            </Form.Group>
                            <Button variant="primary" type="submit">Submit</Button>
                        </Form>
                        <span>Already Have An Account <Link to="/login">log in</Link> </span>
                    </Col>
                </Row>
            </Container>
        </div>
      
    )
  }
}
