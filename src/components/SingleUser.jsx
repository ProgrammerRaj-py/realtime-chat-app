import React from 'react'

import img from '../images/images.jpg'

export default function SingleUser() {
    return (
        <div className="user">
            <div className="profile singleProfile">
                <div className="content">
                    <div className="picture">
                        <img src={img} alt="Profile Img"/>
                    </div>
                    <div className="details">
                        <h1>Coding Nepal <i className="fas fa-circle"></i></h1>
                        <p className="lastMsg">You: Hello souvik. How are you ?</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
