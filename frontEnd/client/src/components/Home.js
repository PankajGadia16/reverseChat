import React, { Component } from "react";

class Home extends Component {
    state = {
        username: null,
        password: null
    }
    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
        });
    }
    render() {
        const { isUserLogeedIn,
            onSignin,
            onSignup } = this.props
        if (isUserLogeedIn) {
            return (<div>user Logged In!</div>)
        }
        return (
            <div>
                <input placeholder="username" id="username" name="username" value={this.state.username} onChange={this.handleChange} />
                <input placeholder="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} />
                <button onClick={() => onSignin(this.state)}>SignIn</button>
                <button onClick={() => onSignup(this.state)}>SignUp</button>
            </div>
        )
    }
}
export default Home