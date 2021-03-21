import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SignupContainer from './components/SignupContainer'
import LoginContainer from './components/LoginContainer'
import Dashboard from './components/Dashboard'
import ChatBox from './components/ChatBox'
import { useDispatch } from 'react-redux'
// import { useSelector } from 'react-redux'

import { fetchAllMessages, fetchAllData } from './redux/actions'

export let socket = new WebSocket("ws://localhost:8080")
socket.onopen = e =>{
  socket.send(JSON.stringify({type: 'read', path: 'users'}))
  socket.send(JSON.stringify({type: 'read', path: 'messages'}))
}
socket.onclose = ev =>{
  console.log('Socket closed: ', ev)
}


export default function App() {
  const dispatch = useDispatch()
  // const curState = useSelector(state=> state)
  const [datas, setDatas] = useState({allusers: [], allmessages: []}) 
  socket.onmessage = m =>{
    try{
      let data = JSON.parse(m.data)
      switch (data.path) {
        case "users":
          setDatas({
            ...datas,
            allusers: data.data
          })
          break;
        case "messages":
          setDatas({
            ...datas,
            allmessages: data.data
          })
          break;
        default: break;
      }
    }catch(e) {
      console.log("msg fault: ", e.message)
    }
  }
  useEffect(()=>{
    dispatch(fetchAllData(datas.allusers))
    dispatch(fetchAllMessages(datas.allmessages))
    // console.log("Curr state",curState)
  },[datas])

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
