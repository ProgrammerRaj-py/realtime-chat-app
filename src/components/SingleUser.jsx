import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setChatRoom } from '../redux/actions'

import img from '../images/images.jpg'

export default function SingleUser({ data }) {
    let history = useHistory()
    const dispatch = useDispatch()
    const singleChatRoom = () => {
        // console.log("curr id: ", data.id)
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
                        <p className="lastMsg">You: Hello souvik. How are you ?</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
