import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Dashboard.css";
import ScoutMatches from "./ScoutMatches"
import axios from 'axios';

export default function Dashboard() {

    const [items, setItems] = useState([{code : "2024ncash", match : 5, team : 1533, alliance : 0, playoff : true}, {code : "2024ncash", match : 17, team : 1533, alliance : 0, playoff: false}]);
    const Navigate = useNavigate();

    const ScoutUrl = (code,match,team,alliance,playoff) => {
        const url = `/auth/scouting/?code=${code}&match=${match}&team=${team}&alliance=${alliance}&playoff=${playoff}`;
        return Navigate(url);
    }

    const EventChange = () => {
        axios.post("http://localhost:8080/setEvent",{
            event:"2023ncash",
        }, {
            headers:{
                "x-access-token":localStorage.getItem("token")
            }
        });
    }

    const updateEventMatches = () => {
        axios.get("http://localhost:8080/updateEventMatches",{
            headers:{
                "x-access-token":localStorage.getItem("token")
            }
        });
    }

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
            <div>
                <button onClick={EventChange}>test button</button>
            </div>
            <div>
                <button onClick={updateEventMatches}>test button</button>
            </div>
            <div>
                <ScoutMatches items={items}/>
            </div>
        </div>        
    );
}