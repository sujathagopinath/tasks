import axios from 'axios';
import React from 'react'

import ReactDOM from 'react-dom';

class Auth extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            login: '',
            store: '',
            post: ''
        }
    }
    componentDidMount() {
        this.storeCollector();
    }


    login() {
        axios.post('http://localhost:8008/login', {
            email: this.state.email,
            password: this.state.password
        })
            .then(res => {
                console.log(res);
                localStorage.setItem("login", JSON.stringify({
                    login: true,
                    token: res.data.token

                }))
                this.storeCollector()
            })
            .catch(err => {
                console.log(err);
            })
    }

    storeCollector() {
        let store = JSON.parse(localStorage.getItem('login'))
        if (store && store.login) {
            this.setState({
                login: true,
                store: store
            })
        }
    }

    createPost() {
        let token = `Bearer ` + this.state.store.token;
        let config = {
            headers: {
                Authorization: token
            }
        }
        axios.post('http://localhost:8008/posts', {
            post: this.state.post
        }, config)
            .then(res => {
                console.log("response from protected", res);
            }).catch(err => {
                console.log(err);
            })
    }



    render() {
        return (
            <div>

                {
                    !this.state.login ?
                        <div>
                            <input type="text" onChange={(event => (this.setState({ email: event.target.value })))} placeholder="Email id" /> <br />
                            <input type="password" onChange={(event => (this.setState({ password: event.target.value })))} placeholder="Password" /> <br />
                            <button onClick={() => { this.login() }}>Login</button><br />
                        </div>
                        :
                        <div>
                            <textarea onChange={(event => (this.setState({ post: event.target.value })))} placeholder="CreatePost"></textarea><br />
                            <button onClick={() => { this.createPost() }}>Post</button>
                        </div>
                }
            </div>
        )
    }
}

ReactDOM.render(<Auth />, document.getElementById("root"))