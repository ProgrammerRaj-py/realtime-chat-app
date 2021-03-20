import { combineReducers } from 'redux'
import { UserReducer } from './usersReducers'

export const rootReducer = combineReducers({
    Users: UserReducer
})