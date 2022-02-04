import { combineReducers } from "redux"
import * as actionType from "../actions/type"

const insitialstate = {
    currentUser:null,
    isLoading:true,
}

const user_reducer = (state = insitialstate, action)=>{
    switch(action.type){
        case actionType.SET_USER:
            return{
                currentUser: action.payload.currentUser,
                isLoading:false
            }
            default:
                return state
    }
}


const insitialstategroup = {
    currentGroup:null,
}
const user_group = (state = insitialstategroup, action)=>{
    switch(action.type){
        case actionType.SET_CUREENT_GROUP:
            return{
                ...state,
                currentGroup: action.payload.currentgroup,
            }
        default:
            return state

    }
}

const rootReducer = combineReducers({
    user : user_reducer,
    group : user_group
})

export default rootReducer