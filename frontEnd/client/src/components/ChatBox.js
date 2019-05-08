import React, { Component } from "react";
import axios from "axios";

class Home extends Component {
    state = {
        chats: null,
        message: null
    }
    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
        });
    }
    getChatData = () => {
        axios.get("http://localhost:3001/api/chat")
            .then(res => this.setState({ chats: res.data }));
    }
    componentDidMount() {
        const { isUserLogeedIn } = this.props
        if (isUserLogeedIn) {
            this.getChatData()
        }
    }
    getReverse = (message) => {
        let result = "";
        const wordArray = message.split(" ");
        for (let i = wordArray.length - 1; i >= 0; i--) {
            result += wordArray[i] + " ";
        }
        return result.trim();
    }
    onMessageSend = () => {
        const { loggedInUserId: userId } = this.props
        const { message } = this.state
        axios.post("http://localhost:3001/api/chat/", {
            userId,
            message
        })
            .then(({ data: res }) => {
                if (res.success) {
                    this.getChatData()
                }
            })

    }
    render() {
        const { isUserLogeedIn } = this.props
        const { chats } = this.state
        if (!isUserLogeedIn) {
            return (<div>Sorry, to access this page, please Log In!</div>)
        }
        return (
            <div>
                <table >
                    {(chats && chats.success && chats.chat) ?
                        chats.chat.map(item =>
                            (<div>
                                <tr>
                                    <td>{item.username}</td>
                                    <td>{item.message}</td>
                                </tr>
                                <tr>
                                    <td>"BOT"</td>
                                    <td>{this.getReverse(item.message)}</td>
                                </tr>
                            </div>
                            ))
                        : null}
                </table>
                <br />
                <input placeholder="Type yput message!" id="message" name="message" value={this.state.message} onChange={this.handleChange} />
                <button onClick={this.onMessageSend}>Send</button>
            </div>
        )
    }
}
export default Home