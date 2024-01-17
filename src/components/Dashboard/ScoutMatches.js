import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const ScoutMatches = ({ items }) => {
    const Navigate = useNavigate();

    const ScoutUrl = (code,match,team,alliance) => {
        const url = `/auth/scouting/?code=${code}&match=${match}&team=${team}&alliance=${alliance}`;
        return Navigate(url)
    }

    
    return(
        <>
        {items.map((item) => 
            <div className="Dashboard-matches">
                <h1 className="dashboard-text">Match {item.match}</h1>
                <h2 className="dashboard-text">{item.team}</h2>
                <div className="dashboard-go">
                    <button className="dashboard-go" onClick={() => {ScoutUrl(
                        item.code,
                        item.match,
                        item.team,
                        item.alliance)}}>Go</button>
                </div>
                
            </div>
            )
        }
        </>
    )
}

export default ScoutMatches;