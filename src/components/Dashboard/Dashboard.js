import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Dashboard.css";
import ScoutMatches from "./ScoutMatches"
import axios from 'axios';
import api from '../../api.json'

export default function Dashboard() {

    const [items, setItems] = useState();
    const Navigate = useNavigate();
    const [adimn, setAdmin] = useState(false);

    useEffect(() => {
        async function getAssignedMatches() {
            await axios.get(`${api.api}/getAssignedMatches`, {
                headers: {
                    "x-access-token" : localStorage.getItem("token")
                }
            }).then((res) => {
                setItems(res.data);
            });
        }
        async function getAdmin(){
            await axios.get(`${api.api}/getAdmin`,{headers:{"x-access-token":localStorage.getItem("token")}}).then((res)=>{setAdmin(res.data.admin)})
        }
        getAssignedMatches();
        getAdmin();
    },[]);

    return(
        <div>
            <div className='topnav'>
                <a href="/home">Home</a>
                <a className='active' href='/auth/dashboard'>Dashboard</a>
                <a href='/auth/data'>Data</a>
                <a href='/auth/scouting'>Scout</a>
                <a href='/auth/pit-scouting'>Pit Scout</a>
                <a className='nav-logout' href='/logout'>Logout</a>
            </div>
            {adimn && <div className='assign-box'>
                <button  className='assign-button'onClick={()=>{Navigate('/auth/assign')}}>Assign Matches</button>
            </div>}
            <div>
                {items ? <ScoutMatches items={items}/> : <h1>Getting Matches</h1>}
            </div>
        </div>        
    );
}