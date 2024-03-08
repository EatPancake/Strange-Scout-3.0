import React, { useEffect, useState } from "react";
import axios from "axios";
import api from '../../api.json'
import './Assign.css'

export default function Assign() {

    const [users, setUsers] = useState("");

    const [email, setEmail] = useState("");
    const [eventCode, setEventCode] = useState("2024ncpen");
    const [matchNumber, setMatchNumber] = useState();
    const [teamNumber, setTeamNumber] = useState();
    
    const [showNames, setShowNames] = useState(true);

    const assignMatch = () => {
        axios.post(`${api.api}/assignMatch`,{
            email :email,
            eventCode : eventCode,
            matchNumber: matchNumber,
            teamNumber : teamNumber
        }, {
            headers:{
                "x-access-token":localStorage.getItem("token")
            }
        })
    }

    useEffect(() => {
        async function getUsers() {
            await axios.get(`${api.api}/getUsers`, {
                headers: {
                    "x-access-token" : localStorage.getItem("token")
                }
            }).then((res) => {
                setUsers(res.data);
            });
        }
        getUsers();
    },[]);

    const nameSelect = (user) => {
        setEmail(user.email);
        setShowNames(false);
    }

    return(
        <div className="assign">
            <div className='topnav'>
                <a href="/home">Home</a>
                <a className='active' href='/auth/dashboard'>Dashboard</a>
                <a href='/auth/data'>Data</a>
                <a href='/auth/scouting'>Scout</a>
                <a href='/auth/pit-scouting'>Pit Scout</a>
                <a className='nav-logout' href='/logout'>Logout</a>
            </div>
            <h1 className="scouting-text">Assign Matches</h1>
            {showNames && <div>
                {JSON.parse(JSON.stringify(users)).length > 0 ? (
                    <>
                        {users.map((user) =>
                            <div className="assign-box">
                                <button className="assign-button" onClick={() => {nameSelect(user); setShowNames(false);}}> {user.name} </button>
                            </div>
                        )}
                    </>
                ):(
                    <>
                        <p>No Data</p>
                    </>
                )} 
            </div>}
            {!showNames && <div>
                <h1 className="scouting-text">Match Info</h1>
                    <label className="scouting-text">
                        <p>Event Code</p>
                        <input className="event-code" type="text" placeholder="event code" defaultValue={"2024ncpen"}onChange={e => setEventCode(e.target.value)}/>
                    </label>
                    <label className="scouting-text">
                        <p>Match Number</p>
                        <input className="match-number" type="number" placeholder="0" onChange={e => setMatchNumber(e.target.value)}/>
                    </label>
                    <label className="scouting-text">
                        <p>Team Number</p>
                        <input className="team-number" type="number" placeholder="0000" onChange={e => setTeamNumber(e.target.value)}/>
                    </label>
                    <div className="assign-box">
                        <button className="assign-button"onClick={() => {assignMatch(); setShowNames(true);}}>Assign</button>
                    </div>
                    
            </div>}
            
        </div>
    )
}