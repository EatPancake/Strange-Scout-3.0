import {Navigate, Outlet} from "react-router-dom"
import axios from 'axios';
import React from "react";

async function isUserAuth(token){
    return axios.get("http://localhost:8080/isUserAuth", {
        headers: {
            "x-access-token": token,
        },
    }).then((response) => response.data.auth)

}

const Auth = () => {
    //const [isAuth, setAuth] = useState(false); 
    //setAuth(isUserAuth() ? true : false);
    const token = localStorage.getItem("token");
    let isAuth;

    if(token) {
        isAuth = isUserAuth(token);
    } else {
        isAuth = false;
    }
    

    console.log(isAuth);

    return isAuth ? <Outlet/> : <Navigate to="/login"/>;
}

export default Auth