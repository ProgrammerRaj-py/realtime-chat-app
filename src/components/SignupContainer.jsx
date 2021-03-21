import React, { useRef } from 'react'
import uuid from 'react-uuid'
import { socket } from '../App'
import { Link, useHistory } from 'react-router-dom'
import { createNewUser, setCurrentUser } from '../redux/actions'
import { useDispatch } from 'react-redux'
import '../scss/Signup&Login.scss'

export default function SignupContainer() {
    const fname = useRef(); const lname = useRef(); const email = useRef(); const password = useRef()
    const history = useHistory()
    const dispatch = useDispatch()

    const UserCreateHandeler = async e => {
        e.preventDefault()
        let fullname = fname.current.value.concat(" ")
        fullname = fullname.concat(lname.current.value)
        
        const newUser = {
            id: uuid(),
            name: fullname,
            email: email.current.value,
            password: password.current.value,
            active: true
        }
        socket.send(
            JSON.stringify({
                type: 'create',
                path: 'users',
                data: newUser
            })
        )
        dispatch(createNewUser(newUser))
        dispatch(setCurrentUser(newUser))
        history.push("/dashboard")
    }
    return (
        <section className="signupContainer">
            <h1 className="title">Realtime Chat App</h1>
            <form onSubmit={e=>UserCreateHandeler(e)}>
                <div className="name">
                    <div className="fname">
                        <label htmlFor="firstName">First Name</label>
                        <input required type="text" name="firstName" id="firstname" placeholder="First name" ref={fname}/>
                    </div>
                    <div className="lname">
                        <label htmlFor="lastName">Last Name</label>
                        <input required type="text" name="lastName" id="lastname" placeholder="Last name" ref={lname}/>
                    </div>
                </div>
                <div className="contents">
                    <div className="email">
                        <label htmlFor="emailAdd">Email Address</label>
                        <input required type="email" name="email" id="emailAdd" placeholder="Email address" ref={email}/>
                    </div>
                    <div className="password">
                        <label htmlFor="passwordAdd">Password</label>
                        <input required type="password" name="password" id="passwordAdd" placeholder="Password" ref={password}/>
                    </div>
                    {/* <div className="file">
                        <label htmlFor="fileAdd">Profile Picture</label>
                        <input type="file" name="file" id="fileAdd"/>
                    </div> */}
                </div>
                <input type="submit" value="Continue to Chat"/>
            </form>
            <div className="signedUp">
                <p>Already Signed up? <Link to="/">Login now</Link></p>
            </div>
        </section>
    )
}
