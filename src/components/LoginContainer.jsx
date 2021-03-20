import axios from 'axios';
import React, { useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import '../scss/Signup&Login.scss'

export default function LoginContainer() {
    const email = useRef(); const password = useRef();
    const history = useHistory()

    const UserLoginHandeler = async e =>{
        e.preventDefault()
        let userLogin
        await axios.get(`http://localhost:3000/users?email=${email.current.value}&password=${password.current.value}`)
        .then(response => {
            userLogin = response.data
            if (userLogin.length > 0){
                userLogin = userLogin[0]
                history.push("/dashboard")
            }
            else{
                alert("No user found :(")
            }
        })
        .catch(e=> console.log(e))
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
