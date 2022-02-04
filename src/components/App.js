import { Component } from "react"
import { getAuth } from "../firebase"
import {setuser } from "../actions"
import { connect} from "react-redux"
import { Row,Col } from 'react-bootstrap'
import Slidebar from "./Slidebar/Slidebar"
import Massage from "./Massage/Massage"
import Metapanel from "./Metapanel/Metapanel"


class App extends Component {
  state = {
    userName:"",
    userID: "",

  }
  componentDidMount(){
    getAuth().onAuthStateChanged((user) =>{
      if(user){
        this.props.setuser(user)
        this.setState({userID:user.uid})
        this.setState({userName:user.displayName})
      }
    })
  }
  render(){
    
    return (
    <>
    <Row style={{textAlign:"center", margin:"0px"}}>
    <Col sm={3} style={{height:"100vh", backgroundColor:"#3535c3", color:"white"}}> 
      
      <Slidebar  name={this.state.userName}></Slidebar>
    </Col>
    <Col sm={6}>
      <Massage gname={this.props.groupAll?this.props.groupAll:""}  id={this.state.userID}></Massage>
    </Col>
    <Col sm={3}>
      <Metapanel></Metapanel>
    </Col>
    </Row>
  </>
    );
  }
}
// let mapStateToProps = (state)=>({
//   groups: state.group.currentGroup
// })
const mapStateToProps = (state)=>({
  groupAll: state.group.currentGroup,
})
export default connect(mapStateToProps,{setuser})(App)

// gid={this.props.groups ?this.props.groups.id:""}