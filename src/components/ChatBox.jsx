import React, { useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { socket } from '../App'
import { createNewMessage } from '../redux/actions'

import '../scss/ChatBox.scss'
import img from '../images/images.jpg'

export default function ChatBox(){
    const textBox = useRef(); const scrollDiv = useRef(); const dispatch = useDispatch(); const history = useHistory();
    const allMessages = useSelector(state=> state.Messages)
    const allUsers = useSelector(state=> state.Users)

    const scrollToBottom = () =>{
        scrollDiv.current?.scrollIntoView({ behavior: "smooth" })
    }
    const getDate = () =>{
        const d = new Date()
        let hours = d.getHours(); const min = d.getMinutes()
        if(hours > 12){ hours -= 12; return `${hours}:${min} PM`}
        else{ return `${d.getHours()}:${d.getMinutes()} AM`}
    }
    useEffect(()=>{
        scrollToBottom()
    },[allMessages])

    if (typeof allUsers.currentuser.id === 'undefined'){
        history.push("/")
        return (<></>)
    }

    const cusActive = allUsers.allusers.filter(user => user.id === allMessages.chatroomuser.id)[0].active
    let messages = allMessages.allChats.filter(mess =>
        (mess.user_received === allMessages.chatroomuser.id && mess.user_sent === allUsers.currentuser.id) || (mess.user_received === allUsers.currentuser.id) && mess.user_sent === allMessages.chatroomuser.id) 
    // console.log("messages",messages)

    const createMessaage = e =>{
        e.preventDefault()
        let msg = {
            user_sent: allUsers.currentuser.id,
            user_received: allMessages.chatroomuser.id,
            content: textBox.current.value,
            sentat: getDate()
        }
        socket.send(JSON.stringify({
            type: 'create',
            path: 'messages',
            data: msg
        }))
        dispatch(createNewMessage(msg))
        textBox.current.value = ''

        // console.log("textBox", msg)
    }

    return (
        <div className="ChatBox">
            <header>
                <i className="fas fa-arrow-left" onClick={()=> history.push("/dashboard")}></i>
                <div className="profile">
                    <div className="content">
                        <div className="picture">
                            <img src={img} alt="Profile Img"/>
                        </div>
                        <div className="details">
                            <h1>{allMessages.chatroomuser.name} <i className={cusActive ? "fas fa-circle" : "fas fa-circle red"}></i></h1>
                            <p className="lastMsg">{cusActive ? "Active Now" : "Inactive"}</p>
                        </div>
                    </div>
                </div>
            </header>
            <section className="chatSection">
                <ul className="chats">
                    {messages.map((message, i) =>
                        <li key={i} className={message.user_sent === allUsers.currentuser.id ? "chat sent" : "chat received"}>
                            <div className="msgContainer">
                                <p className="msg">{message.content}</p>
                                <p className="time">{message.sentat}</p>
                            </div>
                        </li>   
                    )}
                    <div ref={scrollDiv} className="scroll"></div>
                </ul>
            </section>
            <form onSubmit={e => createMessaage(e)}>
                <textarea name="chat" id="chat" placeholder="Write your message ..." ref={textBox}></textarea>
                <button type="submit"><i className="fas fa-paper-plane"></i></button>
            </form>
        </div>
    )
}
