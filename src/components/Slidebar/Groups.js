import React, { Component } from 'react'
import { connect } from 'react-redux';
import { setcurrentgroup } from '../../actions';
import { Modal,Button,Form, Row,Col,Alert,ListGroup } from 'react-bootstrap';
import { getDatabase, ref, set, push,onValue } from "firebase/database";


class Groups extends Component {
    state= {
        groups:[],
        modal:false,
        groupname:"",
        grouptagname:"",
        err:"",
        firstload:true,
        active:""
    }

    handleChange = (e)=>{
        this.setState({[e.target.name]: e.target.value})
    }
    handleSubmit = (e)=>{
       e.preventDefault()
      if(this.isFromValid(this.state)){
        const db = getDatabase();
        const grouptRef = ref(db, 'groups');
        const newGrouptRef = push(grouptRef);
        set(newGrouptRef, {
          groupname: this.state.groupname,
          grouptagname: this.state.grouptagname,
          createdby:this.props.name
      }).then(()=>{
        this.setState({modal:false})
        this.setState({groupname:""})
        this.setState({grouptagname:""})
        this.setState({err:""})
      })
      }else{
          this.setState({err:"Please fill Information box"})
      }
    }

    isFromValid = ({groupname,grouptagname}) =>{
        if(groupname && grouptagname){
            return true
        }else{
            return false
        }
    }

    componentDidMount(){

        let groupafterload = []
        const db = getDatabase();
        const grouptRef = ref(db, 'groups/');
        onValue(grouptRef, (snapshot) => {
          snapshot.forEach(item=>{
            let groupdata = {
              id: item.key,
              groupname: item.val().groupname,
              grouptagname: item.val().grouptagname,
              createdby:item.val().createdby
            }
            groupafterload.push(groupdata)
          })
       

            this.setState({groups:groupafterload},this.addgroupload)
            // this.setState({groups:groupafterload},console.log("ami did mount"))
          
        });
      }

    addgroupload = ()=>{
      let firstload = this.state.groups[0]
      if(this.state.firstload && this.state.groups.length > 0){
        this.props.setcurrentgroup(firstload)
        this.setState({active:firstload.id})
      }
      this.setState({firstload:false})
    }  
    
    
    modalOpen = () =>{
        this.setState({modal:true})
    }
    handleClose = () =>{
        this.setState({modal:false})
    }
    groupChange = (group) =>{
      this.setState({active: group.id})
      this.props.setcurrentgroup(group)
    }
   
  render() {
    return (
      <div>
       <header>
       <h4 style={{ marginTop:"40px"}}>Groups ({this.state.groups.length}) <a onClick={this.modalOpen} style={{color:"#fff", textDecoration:"none", marginLeft:"140px", cursor:"pointer"}}>+</a></h4>
       </header>
       <ListGroup as="ul" style={{marginTop:"40px"}}>
         {this.state.groups.map(item=>(
           <ListGroup.Item style={item.id == this.state.active ? menulistactive : menulist}  onClick={()=>this.groupChange(item)} as="li">{item.groupname}</ListGroup.Item>
         ))}
      </ListGroup>
       
        
        <Modal show={this.state.modal}>
                        <Row className="justify-content-lg-center text-center mt-5">
                            <h2>Group Member Add</h2>
                        <Col sm lg="10">
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3 mt-3">
                                <Form.Control type="Name" onChange={this.handleChange} name='groupname' placeholder="Group Name"/>
                            </Form.Group>
                            <Form.Group className="mb-3 mt-3">
                                <Form.Control type="Name" onChange={this.handleChange} name='grouptagname' placeholder="Group Tagname"/>
                            </Form.Group>
                        </Form>
                        {this.state.err ? <Alert variant="danger">
                            <Alert.Heading>{this.state.err}</Alert.Heading>
                        </Alert>: ""}
                            </Col>
                        </Row>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleSubmit}>
           Add Group
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    )
  }
}
let menulist ={
  margin:"5px 0",
  backgroundColor:"rgba(0,0,0,0.5)",
  color:"#fff"
}
let menulistactive ={
  backgroundColor:"#fff"
}

export default connect(null, {setcurrentgroup})(Groups)
