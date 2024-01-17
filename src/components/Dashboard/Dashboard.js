import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Dashboard.css"
import List from "./List"
import ScoutMatches from "./ScoutMatches"

export default function Dashboard() {

    const [items, setItems] = useState([{code : "2024ncash", match : 5, team : 1533, alliance : 0}, {code : "2024ncash", match : 17, team : 1533, alliance : 0}])
    const Navigate = useNavigate();

    const ScoutUrl = (code,match,team,alliance,position) => {
        const url = `/auth/scouting/?code=${code}&match=${match}&team=${team}&alliance=${alliance}&position=${position}`;
        return Navigate(url)
    }

    return(
        <div>
            <div className='topnav'>
                <a href="/home">Home</a>
                <a className='active' href='/auth/dashboard'>Dashboard</a>
                <a href='/auth/scouting'>Scout</a>
                <a className='nav-logout' href='/logout'>Logout</a>
            </div>
            <div>
                <ScoutMatches items={items}/>
            </div>
        </div>        
    );
}