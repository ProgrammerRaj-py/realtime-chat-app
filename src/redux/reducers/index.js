import { combineReducers } from 'redux'
import { UserReducer } from './usersReducers'
import { ChatReducer } from './messagesReducer'

export const rootReducer = combineReducers({
    Users: UserReducer,
    Messages: ChatReducer
})