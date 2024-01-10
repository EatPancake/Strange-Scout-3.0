import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Login.css'
import '../SignUp/SignUp.css'
import logo from '../imgs/tripleStrange.png';
import PropTypes from 'prop-types';
import Dashboard from "../Dashboard/Dashboard";

//var loginswitch = true;

export default function Login({setToken}) {

    const [email , setEmail] = useState('');
    const [password, setPassword] = useState('');


    const [loginStatus, setLoginStatus] = useState("");


    const Navigate = useNavigate();

    const login = () => {
        axios.post("http://localhost:8080/login", {
            email: email,
            password: password
        }).then(response => {
            setLoginStatus(response.data.message)
            if(response.data.auth) {
                setToken(response.data.token);
                Navigate("/auth/dashboard")
            }

        })
    };

    const userAuthenticated = () => {
        if(localStorage.getItem('token'))
        {
            try{
                axios.get("http://localhost:8080/isUserAuth", {
                headers: {
                    "x-access-token":localStorage.getItem("token"),
                },
            }).then((response) => {
                Navigate("/auth/dashboard")
            });
            } catch(err) {
                console.log("no token");
            }
        }
        
        
    };

    const switchL = () => {
        Navigate("/signup");
    } 

    userAuthenticated();

    return(
        <div className="main">
            <div className="login">
                <h1>Login</h1>
                <img className="login-image" src={logo} alt="Triple Strange Logo"></img>
                <p className="login-status">{loginStatus}</p>
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
                <div>
                    <button className="switch-button" onClick={switchL}>Sign up</button>   
                </div>          
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