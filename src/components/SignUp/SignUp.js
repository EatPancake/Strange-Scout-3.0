import React, { useState } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom"

import './SignUp.css';
import logo from '../imgs/tripleStrange.png'

export default function SignUp() {

    const [email , setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');

    const [createdStatus, SetCreatedStatus] = useState('');

    const Navigate = useNavigate();
    
    const userAuthenticated = () => {
        if(localStorage.getItem('token'))
        {
            try{
                axios.get("http://localhost:8080/isUserAuth", {
                headers: {
                    "x-access-token":localStorage.getItem("token"),
                },
            }).then((response) => {
                console.log(response);
                Navigate("/auth/dashboard")
            });
            } catch(err) {
                console.log("no token");
            }
        }
    }

    const register = () => {
        axios.post("http://localhost:8080/register", {
            username:username,
            password:password,
            email:email,
            name:name
        }).then(res => {
            SetCreatedStatus(JSON.stringify(res));
            if(res.data.created)
            {
                Navigate("/login");
            }
        })
    };

    const switchL = () => {
        Navigate("/login");
    }


    userAuthenticated();

    return(
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
                <div>
                    <button className="switch-button" onClick={switchL}> Login </button>   
                </div>

            <h1>{createdStatus}</h1>
        </div>
    );
}