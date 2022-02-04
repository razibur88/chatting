import { getDownloadURL, uploadBytesResumable,ref } from 'firebase/storage';
import React, { Component } from 'react'
import { Row,Col,Form,Modal,Button } from 'react-bootstrap';
import { storage } from '../../firebase';
import { getDatabase, ref as refer, set, push,child } from "../../firebase";

export default class ImageModal extends Component {
  state ={
    file:"",
    progress:""
  }
    handleImage = (event)=>{
      this.setState({file:event.target.files[0]})
    }

    handleUpload = ()=>{
      if(this.state.file){
        let StorageRef = ref(storage,`files/`)
        let uploadtask = uploadBytesResumable(StorageRef, this.state.file)
        uploadtask.on("state-changed",(snapshot)=>{
          let progress1 = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          this.setState({progress:progress1})
          console.log(this.state.progress)

        },(err)=>{
            console.log(err)
        },()=>{
          getDownloadURL(uploadtask.snapshot.ref).then((url)=>{
            const db = getDatabase();
            const grouptRef = refer(db, 'images');
            const newGrouptRef = push(grouptRef);
            set(newGrouptRef, {
                url: url,
                date:Date(),
                sender: this.props.userid,
                groupid:this.props.groupId
            })
          })
        })
    }else{
      console.log("upload hoi ni")
    }
  }

  render() {
    return (
      <div>
        <Modal show={this.props.modal}>
                        <Row className="justify-content-lg-center text-center mt-5">
                            <h2>Upload Image</h2>
                        <Col sm lg="10">
                   
                            <Form.Group className="mb-3 mt-3">
                                <Form.Control onChange={this.handleImage} type="file"/>
                            </Form.Group>
                     
                            </Col>
                        </Row>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.close}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleUpload}>
           Upload
          </Button>
        </Modal.Footer>
      </Modal>
     </div>
    )
  }
}

