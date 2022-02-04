import React, { Component } from 'react'
import { Row,Col,Form,FormControl,Button,Card } from 'react-bootstrap';
import MassageForm from './MassageForm';
import moment from 'moment';
import { getDatabase, ref,onValue } from "../../firebase";

export default class Massage extends Component {
  state = {
    groupmsg:[],
    megerr:[],
    groupimages:[],
  }

  componentDidMount(){
    let megerr = []
    const db = getDatabase();
      const commentsRef = ref(db, 'massages/');
      onValue(commentsRef, (data) => {
        megerr = []
          data.forEach((item)=>{
            megerr.push(item.val())
          })
          this.setState({groupmsg:megerr})
      });

      // images

      let imageerr = []
      const imagesRef = ref(db, 'images/');
      onValue(imagesRef, (data) => {
        imageerr = []
          data.forEach((item)=>{
            imageerr.push(item.val())
          })
          this.setState({groupimages:imageerr})
      });

    }
  




  render() {
    return (
      <div>
       <Row style={{margin:"20px", borderBottom:"2px solid #d1d1d1", padding:"30px"}}>
         <Col sm={7}>
           <h2 style={{textAlign:"left"}}>Group</h2>
         </Col>
         <Col sm={5}>
         <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form>
         </Col>
       </Row>
       <Row>
       <Col sm={12}>
         <div style={{height:"400px", overflowY:"scroll",textAlign:"left", margin:"0 15px", padding:"0 20px"}}>
            {this.state.groupmsg.map(item=>(
             <div style={this.props.id==item.sender? center:left}>
               <div>
               <span>{moment(item.date).fromNow()}</span>
                <h6>{item.msg}</h6>
               </div>
              
              </div>
            ))}

            {this.state.groupimages.map(item=>(
             <div style={this.props.id==item.sender? center:left}>
               <div>
               <span>{moment(item.date).fromNow()}</span>
               <Card.Img variant="top" src={item.url} />
               </div>

              </div>
            ))}

         </div>
       </Col>
       </Row>
       <MassageForm gname={this.props.gname} id={this.props.id}></MassageForm>
      </div>
    )
  }
}
const center ={
  textAlign:"right",
}
const left ={
  textAlign:"left"
}
