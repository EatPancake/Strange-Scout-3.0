import React, { useState } from "react";
import "./Scouting.css"

// --- Point Values

// --- Auto
const AUTO_LEAVE = 2;
const AUTO_AMP_NOTE = 2;
const AUTO_SPEAKER = 5;

// --- Teleop
const TELE_AMP_NOTE = 1;
const TELE_SPEAKER = 2;
const TELE_SPEAKER_AMPLIFIED = 5;
const TELE_PARK = 1;
const TELE_ONSTAGE = 3;
const TELE_ONSTAGE_SPOTLIGHT = 4;
const TELE_HARMONY = 2;
const TELE_TRAP = 5;



export default function Scouting() {
    const [infoShow, setInfo] = useState(true);
    const [autoShow, setAuto] = useState(false);
    const [teleShow, setTele] = useState(false);

    const [moved, setMoved] = useState(false);
    const [isParked, setParked] = useState(false);





    return(
        <div>
            <div className='topnav'>
                <a href="/home">Home</a>
                <a href='/auth/dashboard'>Dashboard</a>
                <a className='active'href='/auth/scouting'>Scout</a>
                <a className='nav-logout' href='/logout'>Logout</a>
            </div>
            <div>
                {infoShow === true && <div className="scouting-data">
                    <h1 className="scouting-text">Round Info</h1>
                    <label className="scouting-text">
                        <p>Event Code</p>
                        <input className="event-code" type="text" placeholder="event code"/>
                    </label>
                    <label className="scouting-text">
                        <p>Round Number</p>
                        <input className="round-number" type="number" placeholder="0"/>
                    </label>
                    <label className="scouting-text">
                        <p>Team Number</p>
                        <input className="team-number" type="number" placeholder="0000"/>
                    </label>
                    <label className="scouting-text">
                        <p>Position</p>
                        <select className="bot-position">
                            <option value="1">Position 1</option>
                            <option value="2">Position 2</option>
                            <option value="3">Position 3</option>
                        </select>
                    </label>
                    <div>
                        <label className="scouting-text">
                            <button className="scouting-button" onClick={() => {setInfo(false); setAuto(true);}}>Continue</button>
                        </label>
                    </div>
                    
                </div>}
                {autoShow === true && <div className="scouting-auto">
                    <h1 className="scouting-text">Autonomous</h1>
                    {!moved && <div>
                        <label className="scouting-text">
                            <button className="scouting-button" onClick={() => {setMoved(true);}}>Left Starting Zone</button>
                        </label>
                    </div>}
                    <div>
                        <label className="scouting-text">
                            <button className="scouting-button">Scored AMP</button>
                        </label>
                    </div>
                    <div>
                        <label className="scouting-text">
                            <button className="scouting-button">Scored Speaker</button>
                        </label> 
                    </div> 
                    <div>
                        <label className="scouting-text">
                            <button className="scouting-button" onClick={() => {setAuto(false); setTele(true);}}>Continue</button>
                        </label>
                    </div>                           
                </div>}
                {teleShow  === true && <div className="scouting-tele">
                    <h1 className="scouting-text">Teleop</h1>
                    <div>
                        <label className="scouting-text">
                            <button className="scouting-button">Scored AMP</button>
                        </label>
                    </div>
                    <div>
                        <label className="scouting-text">
                            <button className="scouting-button">Scored Speaker</button>
                        </label>
                    </div>
                    <div>
                        <label className="scouting-text">
                            <button className="scouting-button">Speaker Amplified</button>
                        </label> 
                    </div>  
                    <h3 className="scouting-text">End Game</h3>  
                    {!isParked && <div>
                        <label className="scouting-text">
                            <button className="scouting-button" onClick={() => {setParked(true);}}>Parked</button>
                        </label>
                    </div>}
                    <div>
                        <label className="scouting-text">
                            <button className="scouting-button">Scored Trap</button>
                        </label> 
                    </div> 
                    <div>
                        <label className="scouting-text">
                            <button className="scouting-button">On Stage</button>
                        </label> 
                    </div>
                    <div>
                        <label className="scouting-text">
                            <button className="scouting-button">Spot Light</button>
                        </label>  
                    </div>
                    <div>
                        <p className="scouting-text">Harmony</p>
                        <label className="scouting-text">
                            <select className="tele-harmony">
                                <option value="0">none</option>
                                <option value="1">2 bots</option>
                                <option value="2">3 bots</option>
                            </select>
                        </label>
                    </div>
                </div>}
            </div>
        </div>     
    );
}