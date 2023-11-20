import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    return(
        <div>
            <h2>Dashboard</h2>
            <nav>
                <ul>
                    <li>
                        <Link to="/login">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Login</Link>
                    </li>
                </ul>
            </nav>
        </div>

        
    );
}