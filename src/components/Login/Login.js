import React, { useState } from "react";
import axios from 'axios';
import './Login.css'
import logo from '../imgs/tripleStrange.png';
import PropTypes from 'prop-types';

let loginswitch = true;

export default function Login({setToken}) {

    const [email , setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginStatus, setLoginStatus] = useState("");


    const login = () => {
        axios.post("http://localhost:8080/login", {
            email: email,
            password: password
        }).then(response => {
            if(!response.data.auth) {
                setLoginStatus(false);
            } else {
                console.log(response.data);
                console.log(response.data.token);
                setToken(response.data.token);
                setLoginStatus(true);
            }
        })
    };

    const userAuthenticated = () => {
        axios.get("http://localhost:8080/isUserAuth", {
            headers: {
                "x-access-token":localStorage.getItem("token"),
            },
        }).then((response) => {
            console.log(response);
        });
    };





    
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');

    const [createdStatus, SetCreatedStatus] = useState('');

    
    

    const register = () => {
        axios.post("http://localhost:8080/register", {
            username:username,
            password:password,
            email:email,
            name:name
        }).then(res => {
            SetCreatedStatus(JSON.stringify(res));
        })
    };

    return(
        <div className="main">
            <div className="login">
                <h1>Login</h1>
                <img className="login-image" src={logo} alt="Triple Strange Logo"></img>
                <label className='login-label'>
                    <p>Email</p>
                    <input className="login-input" type="email" placeholder="Email"
                    onChange={e => setEmail(e.target.value)}/>
                </label>
                <label className="login-label">
                    <p>Password</p>
                    <input className="login-input" type="password" placeholder="Password"
                    onChange={e => setPassword(e.target.value)}/>
                </label>
                <div >
                    <button className="login-button" onClick={login}>Login</button>
                    
                </div>          
            </div>}
            <div className="signup">
                <h1>Sign up</h1>
                <img className="signup-image"src={logo} alt="Triple Strange Logo"></img>
                <label>
                    <p>Email</p>
                    <input className="signup-input" type="email" placeholder="Email"
                    onChange={e => setEmail(e.target.value)}/>
                </label>
                <label>
                    <p>Username</p>
                    <input className="signup-input" type="text" placeholder="Username"
                    onChange={e=> setUsername(e.target.value)}/>
                </label>
                <label>
                    <p>Name</p>
                    <input  className="signup-input" type="text" placeholder="Name"
                    onChange={e=> setName(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input className="signup-input" type="password" placeholder="Password"
                    onChange={e => setPassword(e.target.value)}/>
                </label>
                <div>
                    <button className="signup-button" onClick={register}>Create Account</button>
                </div>

                <h1>{createdStatus}</h1>
            </div>
            
        </div>
        
        
        
    );
}

Login.prototype = {
    setToken: PropTypes.func.isRequired
}

/* 
<button onClick={userAuthenticated}>Checkauth</button>
                {loginStatus}
*/