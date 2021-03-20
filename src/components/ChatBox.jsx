import React from 'react'
import '../scss/ChatBox.scss'

import img from '../images/images.jpg'

const messages = []

export default function ChatBox(){
    return (
        <div className="ChatBox">
            <header>
                <i className="fas fa-arrow-left"></i>
                <div className="profile">
                    <div className="content">
                        <div className="picture">
                            <img src={img} alt="Profile Img"/>
                        </div>
                        <div className="details">
                            <h1>Coding Nepal <i className="fas fa-circle"></i></h1>
                            <p className="lastMsg">Active Now</p>
                        </div>
                    </div>
                </div>
            </header>
            <section className="chatSection">
                <ul className="chats">
                    {messages.map((message, i) =>
                        <li key={i} className={message.type === "sent" ? "chat sent" : "chat receive"}>
                            <div className="msgContainer">
                                <p className="msg">{message.massage}</p>
                                <p className="time">13:20 PM</p>
                            </div>
                        </li>   
                    )}
                    <div itemID="scrollIntoView"></div>
                </ul>
            </section>
            <form>
                <input type="text" name="chat" id="chat" placeholder="Write your message ..."/>
                <button type="submit"><i className="fas fa-paper-plane"></i></button>
            </form>
        </div>
    )
}
