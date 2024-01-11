import React, { useState } from "react";
import axios from 'axios';
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

async function isUserAuth(token){
    return axios.get("http://localhost:8080/isUserAuth", {
        headers: {
            "x-access-token" : token,
        },
    }).then((response) => response.data.auth)
}

export default function Scouting() {

    const [eventCode, setEventCode] = useState("");
    const [roundNumber, setRoundNumber] = useState(0);
    const [teamNumber, setTeamNumber] = useState(0);
    const [alliance, setAlliance] = useState(0);
    const [position, setPosition] = useState(0);


    const [aAmp,setAAmp] = useState(0);
    const [aSpeaker,setASpeaker] = useState(0);

    const [tamp,setTAmp] = useState(0);
    const [tspeaker,setTSpeaker] = useState(0);
    const [tspeakerAmp,setTSpeakerAmp] = useState(0);
    const [tonStage,setTonStange] = useState(0);
    const [tspotlight,setTSpotlight] = useState(0);
    const [tharmony,setTHarmony] = useState(0);
    const [tTrap,setTtrap] = useState(0);

    const [moved, setMoved] = useState(false);
    const [isParked, setParked] = useState(false);


    const [infoShow, setInfo] = useState(true);
    const [autoShow, setAuto] = useState(false);
    const [teleShow, setTele] = useState(false);


    const [score, setScore] = useState(0);

    const checkRoundData = () => {
        if(eventCode.length !== 9)
        {
            return false;
        }
        else if(roundNumber === 0)
        {
            return false;
        }
        else if(teamNumber === 0)
        {
            return false;
        }
        else 
        {
            return true;
        }
    }

    const calculateScore= () => {
        var calcScore = 0;
        calcScore = (
            (aAmp * AUTO_AMP_NOTE) +
            (aSpeaker * AUTO_SPEAKER) +
            (tamp * TELE_AMP_NOTE) +
            (tspeaker * TELE_SPEAKER) +
            (tspeakerAmp * TELE_SPEAKER_AMPLIFIED) +
            (tonStage * TELE_ONSTAGE) +
            (tspotlight * TELE_ONSTAGE_SPOTLIGHT) + 
            (tTrap * TELE_TRAP)
        );
        if(moved)
        {
            calcScore += AUTO_LEAVE;
        }
        if(isParked)
        {
            calcScore += TELE_PARK;
        }
        if(tharmony === '1')
        {
            calcScore += TELE_HARMONY;
        } else if (tharmony === '2') {
            calcScore += (TELE_HARMONY*2);
        }

        setScore(calcScore); 
    }

    const Submit = () => {
        calculateScore()
        axios.post("http://localhost:8080/submit", {
            eventCode : eventCode,
            roundNumber : roundNumber,
            teamNumber : teamNumber,
            alliance : alliance,
            position : position,
            A_AMP : aAmp,
            A_Mobility : moved,
            A_Speaker :aSpeaker,
            T_AMP : tamp,
            T_Speaker : tspeaker,
            T_SpeakerAMP : tspeakerAmp,
            T_Trap : tTrap,
            T_OnStage : tonStage,
            T_Spotlight : tspotlight,
            T_Harmony : tharmony,
            T_Parked : isParked,
            score : score
        },{
            headers:{
                "x-access-token":localStorage.getItem("token")
            }
        })
        
    }





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
                        <input className="event-code" type="text" placeholder="event code" onChange={e => setEventCode(e.target.value)}/>
                    </label>
                    <label className="scouting-text">
                        <p>Round Number</p>
                        <input className="round-number" type="number" placeholder="0" onChange={e => setRoundNumber(e.target.value)}/>
                    </label>
                    <label className="scouting-text">
                        <p>Team Number</p>
                        <input className="team-number" type="number" placeholder="0000" onChange={e => setTeamNumber(e.target.value)}/>
                    </label>
                    <label className="scouting-text">
                        <p>Alliance</p>
                        <select className="bot-alliance" onChange={e => setAlliance(e.target.value)}>
                            <option value={0}>Red</option>
                            <option value={1}>Blue</option>
                        </select>
                    </label>
                    <label className="scouting-text">
                        <p>Position</p>
                        <select className="bot-position" onChange={e => setPosition(e.target.value)}>
                            <option value={0}>Position 1</option>
                            <option value={1}>Position 2</option>
                            <option value={2}>Position 3</option>
                        </select>
                    </label>
                    <div>
                        <label className="scouting-text">
                            <button className="scouting-button" onClick={() => {setInfo(!checkRoundData()); setAuto(checkRoundData());}}>Continue</button>
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
                            <button className="scouting-button" onClick={() => {setAAmp(aAmp+1)}}>Scored AMP</button>
                        </label>
                    </div>
                    <div>
                        <label className="scouting-text">
                            <button className="scouting-button" onClick={() => {setASpeaker(aSpeaker+1)}}>Scored Speaker</button>
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
                            <button className="scouting-button" onClick={() => {setTAmp(tamp+1)}}>Scored AMP</button>
                        </label>
                    </div>
                    <div>
                        <label className="scouting-text">
                            <button className="scouting-button" onClick={() => {setTSpeaker(tspeaker+1)}}>Scored Speaker</button>
                        </label>
                    </div>
                    <div>
                        <label className="scouting-text">
                            <button className="scouting-button" onClick={() => {setTSpeakerAmp(tspeakerAmp+1)}}>Speaker Amplified</button>
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
                            <button className="scouting-button" onClick={() => {setTtrap(tTrap+1);}}>Scored Trap</button>
                        </label> 
                    </div> 
                    <div>
                        <label className="scouting-text">
                            <button className="scouting-button" onClick={() => {setTonStange(tonStage+1)}}>On Stage</button>
                        </label> 
                    </div>
                    <div>
                        <label className="scouting-text">
                            <button className="scouting-button" onClick={() => {setTSpotlight(tspotlight+1)}}>Spot Light</button>
                        </label>  
                    </div>
                    <div>
                        <p className="scouting-text">Harmony</p>
                        <label className="scouting-text">
                            <select className="tele-harmony" onChange={e => setTHarmony(e.target.value)}>
                                <option value={0}>none</option>
                                <option value={1}>2 bots</option>
                                <option value={2}>3 bots</option>
                            </select>
                        </label>
                    </div>
                    <p>{score}</p>
                    <div>
                        <label className="scouting-text">
                            <button className="scouting-button" onClick={() =>{Submit();}}>Submit</button>
                        </label>
                    </div>      
                </div>}
            </div>
        </div>     
    );
}