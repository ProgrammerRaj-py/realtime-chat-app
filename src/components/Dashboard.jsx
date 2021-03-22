import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteCurrentUser } from '../redux/actions'
import { socket } from '../App'
import '../scss/Dashboard.scss'

import img from '../images/images.jpg'
import SingleUser from './SingleUser'

export default function Dashboard() {
    const allUsers = useSelector(state=> state.Users)
    const lastMessages = allUsers.currentuser.lastmessage
    // console.log("Current user: ", lastMessages)
    let history = useHistory(); const dispatch = useDispatch()
    const logoutHandeler = () =>{
        socket.send(JSON.stringify({
            type: 'update',
            path: 'users',
            id: allUsers.currentuser.id,
            data: {...allUsers.currentuser, active: false}
        }))
        dispatch(deleteCurrentUser())
        history.push("/")
    }
    if (typeof allUsers.currentuser.id === 'undefined'){
        history.push("/")
        return (<></>)
    }
    return (
        <section className="Dashboard">
            <div className="profile">
                <div className="content">
                    <div className="picture">
                        <img src={img} alt="Profile Img"/>
                    </div>
                    <div className="details">
                        {
                            (typeof allUsers !== 'undefined') ? <>
                            <h1>{allUsers.currentuser.name} <i className="fas fa-circle"></i></h1>
                            <p>{allUsers.currentuser.active ? "Active Now" : "Inactive now"}</p> </>: "Loading"
                        }
                    </div>
                </div>
                <div className="logout">
                    <input type="button" value="Logout" onClick={logoutHandeler} />
                </div>
            </div>
            <div className="users">
                <h1>Chats</h1>
                <div className="allUsers">
                    {
                        allUsers.allusers.map((value, i) => <>
                            {
                                value.id !== allUsers.currentuser.id ? <SingleUser data={value} key={i} lastMessages={lastMessages}/> : ''
                            }
                        </>)
                    }
                </div>
            </div>
        </section>
    )
}
