import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SignupContainer from './components/SignupContainer'
import LoginContainer from './components/LoginContainer'
import Dashboard from './components/Dashboard'
import ChatBox from './components/ChatBox'

export let socket = new WebSocket("ws://localhost:8080")
socket.onopen = e =>{
  socket.send(JSON.stringify({type: 'read', path: 'users'}))
  socket.send(JSON.stringify({type: 'read', path: 'messages'}))
}
let states = {
  allusers: [],
  allmessages: []
}
socket.onmessage = m =>{
  try{
    let mess = JSON.parse(m.data)
    switch (mess.path) {
      case "users":
          states = {
            ...states,
            allusers: mess.data
          }
        break;
      case "messages":
          states = {
            ...states,
            allmessages: mess.data
          }
        break;
    
      default: break;
    }
    console.log('msg', states)
  }catch(e) {
    console.log("msg fault: ", e.message)
  }
}
socket.onclose = ev =>{
  console.log('Socket closed: ', ev)
}
export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginContainer} />
          <Route exact path="/signup" component={SignupContainer} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/chat" component={ChatBox} />
        </Switch>
      </BrowserRouter>
  </div>
  );
}
