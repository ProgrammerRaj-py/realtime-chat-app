import { FETCH_ALL_DATA, SET_CURRENT_USER, DELETE_CURRENT_USER, CREATE_NEW_USER, UPDATE_LAST_MESSAGE } from '../constants'

const init = {
    allusers: [],
    currentuser: {},
}

export const UserReducer = (state = init, action) =>{
    switch (action.type) {
        case FETCH_ALL_DATA:
            return{
                ...state,
                allusers: action.payload
            }
        case SET_CURRENT_USER:
            return{
                ...state,
                currentuser: action.payload
            }
        case DELETE_CURRENT_USER:
            return{
                ...state,
                currentuser: {}
            }
        
        case CREATE_NEW_USER:
            return{
                ...state,
                allusers: [...state.allusers, action.payload]
            }
        case UPDATE_LAST_MESSAGE:
            let lstMsg = state.currentuser.lastmessage
            lstMsg = lstMsg.filter(msg => msg.touser !== action.payload.touser)
            lstMsg.push(action.payload)
            return{
                ...state,
                currentuser: {...state.currentuser, lastmessage: lstMsg}
            }
            
        default: return state;
    }
}