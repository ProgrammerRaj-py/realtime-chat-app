import { FETCH_ALL_MESSAGES, ACTIVE_CHAT_ROOM, CREATE_NEW_MESSAGE } from '../constants'

export const fetchAllMessages = messages => {
    return {
        type: FETCH_ALL_MESSAGES,
        payload: messages
    }
}
export const setChatRoom = user => {
    return {
        type: ACTIVE_CHAT_ROOM,
        payload: user
    }
}
export const createNewMessage = msg => {
    return {
        type: CREATE_NEW_MESSAGE,
        payload: msg
    }
}