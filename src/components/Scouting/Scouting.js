import React from "react";

export default function Scouting() {
    return(
        <div>
            <div className='topnav'>
                <a href='/auth/dashboard'>Dashboard</a>
                <a className='active'href='/auth/scouting'>Scout</a>
            </div>
        </div>     
    );
}