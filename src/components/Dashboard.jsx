import React from 'react'
import '../scss/Dashboard.scss'

import img from '../images/images.jpg'
import SingleUser from './SingleUser'
import { Link } from 'react-router-dom'

export default function Dashboard() {
    return (
        <section className="Dashboard">
            <div className="profile">
                <div className="content">
                    <div className="picture">
                        <img src={img} alt="Profile Img"/>
                    </div>
                    <div className="details">
                        <h1>Raj Mazumder <i className="fas fa-circle"></i></h1>
                        <p>Active now</p>
                    </div>
                </div>
                <div className="logout">
                    <Link to="/">Logout</Link>
                </div>
            </div>
            <div className="users">
                <h1>Chats</h1>
                <div className="allUsers">
                    <SingleUser />
                </div>
            </div>
        </section>
    )
}
