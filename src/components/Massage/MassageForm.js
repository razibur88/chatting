import React, { Component } from 'react'
import { Row,Col,Form,FloatingLabel,Button,Alert } from 'react-bootstrap';
import { getDatabase, ref, set, push,child } from "../../firebase";
import ImageModal from './ImageModal';

export default class MassageForm extends Component {
    state ={
        msg:"",
        msgerr:"",
        modal:false
    }

    handleChange = (e)=>{
        this.setState({[e.target.name]: e.target.value})
    }
    modalOpen = () =>{
        this.setState({modal:true})
    }
    handleClose = () =>{
        this.setState({modal:false})
    }
    handlemsgSubmit = ()=>{
        if(this.state.msg){
            this.setState({msgerr:""})
            const db = getDatabase();
        const grouptRef = ref(db, 'massages');
        const newGrouptRef = push(grouptRef);
        set(newGrouptRef, {
            msg:this.state.msg,
            date:Date(),
            groupid: this.props.gname.id,
            sender: this.props.id
        })
            
        }else{
            this.setState({msgerr:"Add a Massage"})
        }
    }

  render() { 
    return (
      <div>
        <Row style={{margin:"10px"}}>
            <Col>
            
                <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                    <Form.Control type="text" name="msg" onChange={this.handleChange} placeholder="Ad" />
                    
                </Form.Group>
            </Col>
        </Row>
        <Row>
        {this.state.msgerr ? <Alert variant="danger">
                <Alert.Heading>{this.state.msgerr}</Alert.Heading>
                </Alert>: ""}

            <Col><Button onClick={this.handlemsgSubmit} style={{width:"90%",margin:"10px 20px"}} variant="primary">Add Massage</Button></Col>
            <Col><Button style={{width:"90%",margin:"10px 20px"}} variant="secondary" onClick={this.modalOpen}>Add Media</Button></Col>
            <ImageModal groupId={this.props.gname.id} userid={this.props.id} modal={this.state.modal} close={this.handleClose}/>
        </Row>
      </div>
    )
  }
}

