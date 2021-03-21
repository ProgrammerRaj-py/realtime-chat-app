import { FETCH_ALL_MESSAGES, ACTIVE_CHAT_ROOM, CREATE_NEW_MESSAGE } from '../constants'


const int = {
    allChats : [],
    chatroomuser: {}
}
export const ChatReducer = (state = int, action) => {
    switch (action.type) {
        case FETCH_ALL_MESSAGES:
            return {
                ...state,
                allChats: action.payload.filter(f=> f.id !== "1")
            }
        case ACTIVE_CHAT_ROOM:
            return {
                ...state,
                chatroomuser: action.payload
            }
        case CREATE_NEW_MESSAGE:
            return {
                ...state,
                allChats: [...state.allChats, action.payload]
            }
    
        default: return state;
    }
}