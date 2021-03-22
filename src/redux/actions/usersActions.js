import { FETCH_ALL_DATA, SET_CURRENT_USER, DELETE_CURRENT_USER, CREATE_NEW_USER, UPDATE_LAST_MESSAGE } from '../constants'

export const fetchAllData = allUsers => {
    return {
        type: FETCH_ALL_DATA,
        payload: allUsers
    }
}

export const setCurrentUser = currentuser => {
    return {
        type: SET_CURRENT_USER,
        payload: currentuser
    }
}
export const deleteCurrentUser = () => {
    return {
        type: DELETE_CURRENT_USER
    }
}

export const createNewUser = newUser => {
    return {
        type: CREATE_NEW_USER,
        payload: newUser
    }
}

export const updateLastMessage = message => {
    return {
        type: UPDATE_LAST_MESSAGE,
        payload: message
    }
}