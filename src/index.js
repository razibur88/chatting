import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom";
import { getAuth } from "./firebase"
import {createStore} from "redux"
import { Provider} from "react-redux"
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
const store = createStore(rootReducer,composeWithDevTools())





class Routing extends Component{
  state = {
    tracker: false
  }
  componentDidMount(){
    getAuth().onAuthStateChanged((user) =>{
      if(user){
        this.setState({tracker: true})
      }else{
        this.setState({tracker: false})
      }
    })
  }
  render(){
    return(
      <BrowserRouter>
       {this.state.tracker ? 
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/register" element={<Navigate to="/" />} />
          <Route path="/login" element={<Navigate to="/" />} />
        </Routes>
      
      :

      <Routes>
      <Route path="/" element={<Navigate to = "/login" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
      
      }
    </BrowserRouter>
    )
  }
}


ReactDOM.render(<Provider store={store}><Routing /></Provider>,document.getElementById('root'));

