import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import '../scss/Dashboard.scss'

import img from '../images/images.jpg'
import SingleUser from './SingleUser'

// let socket = new WebSocket("ws://localhost:8080")
// socket.onopen = e =>{
//     socket.send(JSON.stringify({type: 'read', path: 'users'}))
// }


export default function Dashboard() {
    const userid = localStorage.realtime_chat_app
    let history = useHistory()
    // if(!userid){history.push("/")}
    const [user, setUser] = useState({})
    const [allUser, setAllUser] = useState([])
    // socket.onmessage = m =>{
    //     const users = JSON.parse(m.data)
    //     setAllUser(users.data)
    //     // console.log(users.data)
    // }

    const LogoutHandel = async() =>{
        // setUser({...user, active: false})
        // socket.send(JSON.stringify({
        //     type: 'update',
        //     path: 'users',
        //     id: userid,
        //     data: user
        // }))
        await axios.patch(`http://localhost:3000/users/${userid}`, {"active": false})
        .then(e=>{
            localStorage.setItem("realtime_chat_app", "")
            history.push("/")
        })
    }
    useEffect(()=>{
        async function getdata(){
            await axios.get("http://localhost:3000/users").then(e=> setAllUser(e.data))
            await axios.get(`http://localhost:3000/users?id=${userid}`)
            .then(response => {
                setUser(response.data[0])
            })
            .catch(error => {
                console.log(error.message)
            })
        }
        getdata()
    },[])
    return (
        <section className="Dashboard">
            <div className="profile">
                <div className="content">
                    <div className="picture">
                        <img src={img} alt="Profile Img"/>
                    </div>
                    <div className="details">
                        {
                            (typeof user !== 'undefined') ? <>
                            <h1>{user.name} <i className="fas fa-circle"></i></h1>
                            <p>{user.active ? "Active Now" : "Inactive now"}</p> </>: "Loading"
                        }
                    </div>
                </div>
                <div className="logout">
                    <input type="button" value="Logout"  onClick={LogoutHandel}/>
                </div>
            </div>
            <div className="users">
                <h1>Chats</h1>
                <div className="allUsers">
                    {
                        allUser.map((value, i) => <>
                            {
                                value.id !== userid ? <SingleUser data={value} key={i}/> : ''
                            }
                        </>)
                    }
                </div>
            </div>
        </section>
    )
}
