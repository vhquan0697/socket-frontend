import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            username: '',
            password: ''
        };
        this.state = this.initialState;
        this.state.socket = props.socket;
        console.log("constructor run");
        this.state.socket.onmessage = (e) => {
            console.log("thiss did run")
        };
    }
    handleChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name] : value
        });
    }
    handleSubmit = () => {
        const {username, password} = this.state;
        const socket = this.props.socket;  
        const history = this.props.history;
        //console.log(socket)
        var msg = {  
            Method: "POST",  
            URL: "users/login",
            DATA: {
                username: username,
                password: password
            }  
        }; 
        socket.send(JSON.stringify(msg))
        socket.onmessage = function(event) {
            var message = event.data;
            //(if message .....)
            console.log(event.data);
            sessionStorage.setItem('authentication', event.data);
            //console.log(message);
            history.push("/");
        };
    }
    render() {
        const {username, password} = this.state;
        return (
            <div>
                <h1>Login</h1>
                <form>
                    <label>Username</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={username} 
                        onChange={this.handleChange} />
                    <label>Password</label>
                    <input 
                        type="text" 
                        name="password" 
                        value={password} 
                        onChange={this.handleChange}/>
                    <input 
                        type="button" 
                        value="Submit" 
                        onClick={this.handleSubmit} />
                </form>
                <Link to='/register'>Don't have account? Create one!</Link>
            </div>
        );
    }
}
export default withRouter(Login);