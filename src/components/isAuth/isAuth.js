import {Navigate, Outlet} from "react-router-dom"
import axios from 'axios';
import React from "react";
import api from '../../api.json'

async function isUserAuth(token){
    return await axios.get(`${api.api}/isUserAuth`, {
        headers: {
            "x-access-token": token,
        },
    }).then((response) => response.data.auth)

}

const Auth = () => {
    //const [isAuth, setAuth] = useState(false); 
    //setAuth(isUserAuth() ? true : false);
    const token = localStorage.getItem("token");
    let isAuth = false;
    if(token) {
        isAuth = isUserAuth(token);
    }

    return isAuth ? <Outlet/> : <Navigate to="/login"/>;
}

export default Auth