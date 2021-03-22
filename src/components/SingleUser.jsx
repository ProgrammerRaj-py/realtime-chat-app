import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setChatRoom } from '../redux/actions'

import img from '../images/images.jpg'

export default function SingleUser({ data, lastMessages }) {
    let history = useHistory()
    const dispatch = useDispatch()
    const msg = lastMessages.find(msg => msg.touser === data.id)
    const singleChatRoom = () => {
        dispatch(setChatRoom(data))
        history.push("/chat")
    }
    return (
        <div className="user" onClick={singleChatRoom}>
            <div className="profile singleProfile">
                <div className="content">
                    <div className="picture">
                        <img src={img} alt="Profile Img"/>
                    </div>
                    <div className="details">
                        <h1>{data.name} <i className={data.active ? "fas fa-circle" : "fas fa-circle red"}></i></h1>
                        <p className="lastMsg">{ !msg ? `No messages` : `You: ${msg.content}`}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
