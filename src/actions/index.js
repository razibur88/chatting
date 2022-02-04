import * as actionType from "./type"

export const setuser = (user)=>{
    return{
        type: actionType.SET_USER,
        payload:{
            currentUser:user
        }
    }
}
export const setcurrentgroup = (group)=>{
    return{
        type: actionType.SET_CUREENT_GROUP,
        payload:{
            currentgroup:group
        }
    }
}