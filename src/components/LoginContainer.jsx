import axios from 'axios';
import React, { useRef, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUser } from '../redux/actions'

import { socket } from '../App'

import '../scss/Signup&Login.scss'

const LoginContainer = () => {
    const email = useRef(); const password = useRef();
    const history = useHistory()
    const dispatch = useDispatch()
    // const allUsers = useSelector(state => state.Users)

    const UserLoginHandeler = async e =>{
        e.preventDefault()
    }
    return (
        <section className="loginContainer">
            <h1 className="title">Realtime Chat App</h1>
            <form onSubmit={e => UserLoginHandeler(e)}>
                <div className="contents">
                    <div className="email">
                        <label htmlFor="emailAdd">Email Address</label>
                        <input required type="email" name="email" id="emailAdd" placeholder="Email address" ref={email}/>
                    </div>
                    <div className="password">
                        <label htmlFor="passwordAdd">Password</label>
                        <input required type="password" name="password" id="passwordAdd" placeholder="Password" ref={password}/>
                    </div>
                </div>
                <input type="submit" value="Continue to Chat"/>
            </form>
            <div className="signedUp">
                <p>Don't have an account? <Link to="/signup">Create Account</Link></p>
            </div>
        </section>
    )
}

export default LoginContainer;