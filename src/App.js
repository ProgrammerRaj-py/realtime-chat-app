import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SignupContainer from './components/SignupContainer'
import LoginContainer from './components/LoginContainer'
import Dashboard from './components/Dashboard'
import ChatBox from './components/ChatBox'

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
