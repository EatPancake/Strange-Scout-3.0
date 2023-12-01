import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    return(
        <div>
            <div className='topnav'>
                <a className='active' href='/auth/dashboard'>Dashboard</a>
                <a href='/auth/scouting'>Scout</a>
                <a className='nav-logout' href='/dashboard'>Logout</a>
            </div>
        </div>

        
    );
}