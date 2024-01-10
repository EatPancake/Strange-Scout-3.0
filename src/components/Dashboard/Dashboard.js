import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Dashboard.css"
import List from "./List"



export default function Dashboard() {

    const [items, setItems] = useState([["FNC District UNC Asheville Event 2024","2024ncash","0","00:00",["0000","0000","0000"],["0000","0000","0000"]]]);

    return(
        <div>
            <div className='topnav'>
                <a href="/home">Home</a>
                <a className='active' href='/auth/dashboard'>Dashboard</a>
                <a href='/auth/scouting'>Scout</a>
                <a className='nav-logout' href='/logout'>Logout</a>
            </div>
            <div className='Dashboard-matches'>
                <div>
                    <List
                        items={items}
                    />
                </div>

            </div>
        </div>

        
    );
}