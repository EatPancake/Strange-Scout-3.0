import axios from 'axios';
import { useState } from 'react';

export default function authToken() {
    const getAuth = () => {
        axios.get("http://localhost:8080/isUserAuth", {
            headers: {
                "x-access-token":localStorage.getItem("token"),
            },
        }).then((response) => {
            const auth = response.data.auth;
            return(auth);
        })
        return(false);
    }
    const [userAuth, getAuth] = useState(auth());

    const saveAuth = auth => {
        setAuth(auth)
    }

    return {
        setAuth : saveAuth ,
        isAuth
    }
}