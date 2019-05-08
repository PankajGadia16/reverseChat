import React, { Component } from "react";
import axios from "axios";

class Home extends Component {
    state = {
        data: null
    }
    componentDidMount() {
        const { isUserLogeedIn } = this.props
        if (isUserLogeedIn) {
            axios.get("http://localhost:3001/api/chat/count")
                .then(res => this.setState({ data: res.data }));
        }
    }
    render() {
        const { isUserLogeedIn } = this.props
        const { data } = this.state
        if (!isUserLogeedIn) {
            return (<div>Sorry, to access this page, please Log In!</div>)
        }
        return (
            <div>
                <table >
                    {(data && data.success) ?
                        data.countData.map(item =>
                            (<tr>
                                <td>{item.username}</td>
                                <td>{item.count}</td>
                            </tr>))
                        : null}
                </table>
            </div>
        )
    }
}
export default Home