import React, { Component } from 'react'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import ChatBox from './components/ChatBox'
import axios from "axios";

class App extends Component {
    state = {
        currentTab: "NONE",
        isUserLogeedIn: false,
        loggedInUserId: null,
        message: null
    };

    onSignin = (data) => {
        axios.post("http://localhost:3001/api/user/signin", data)
            .then(({ data: res }) => {
                if (res.success) {
                    this.setState({
                        isUserLogeedIn: true,
                        loggedInUserId: res.user._id,
                        message: null
                    })
                }
                else {
                    this.setState({
                        message: res.error
                    })
                }
            })
            .catch(err => {
                this.setState({
                    message: err
                })
            })

    }
    onSignup = (data) => {
        axios.post("http://localhost:3001/api/user/signup", data)
            .then(({ data: res }) => {
                if (res.success) {
                    this.setState({
                        isUserLogeedIn: false,
                        loggedInUserId: null,
                        message: "User signed Up successfully. Please Login to continue!"
                    })
                }
                else {
                    this.setState({
                        message: res.error
                    })
                }
            })
            .catch(err => {
                this.setState({
                    message: err
                })
            })
    }
    render() {
        const { currentTab, isUserLogeedIn, loggedInUserId, message } = this.state
        return (
            <div>
                <div>
                    <button onClick={() => { this.setState({ currentTab: "Home" }) }}>Home</button>
                    <button onClick={() => { this.setState({ currentTab: "Dashboard" }) }}>Dashboard</button>
                    <button onClick={() => { this.setState({ currentTab: "ChatBox" }) }}>ChatBox</button>
                </div>
                {(currentTab === "Home") ?
                    <Home
                        isUserLogeedIn={isUserLogeedIn}
                        onSignin={this.onSignin}
                        onSignup={this.onSignup}
                    /> :
                    null}
                {(currentTab === "Dashboard") ?
                    <Dashboard
                        isUserLogeedIn={isUserLogeedIn}
                    /> :
                    null}
                {(currentTab === "ChatBox") ?
                    <ChatBox
                        isUserLogeedIn={isUserLogeedIn}
                        loggedInUserId={loggedInUserId}
                    /> :
                    null}
                <div>{message}</div>
            </div>
        )
    }
}

export default App