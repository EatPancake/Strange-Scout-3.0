import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from 'axios';
import "./Scouting.css"
import api from "../../api.json"

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

// async function isUserAuth(token){
//     return axios.get("http://localhost:8080/isUserAuth", {
//         headers: {
//             "x-access-token" : token,
//         },
//     }).then((response) => response.data.auth)
// }



export default function Scouting() {
    const [currentTime, setCurrentTime] = useState();
    const [canScore, setCanScore] = useState();

    const [searchParams, setSearchParams] = useSearchParams();

    const [eventCode, setEventCode] = useState(searchParams.get("code"))
    const [matchNumber, setMatchNumber] = useState(searchParams.get("match"));
    const [playoff, setPlayoffValue] = useState(false)
    const [teamNumber, setTeamNumber] = useState(searchParams.get("team"));
    const [alliance, setAlliance] = useState(searchParams.get("alliance") ? searchParams.get("alliance") : 0);
    const [position, setPosition] = useState(0);


    const [aAmp,setAAmp] = useState(0);
    const [aSpeaker,setASpeaker] = useState(0);
    const [aPickup, setAPickup] = useState(0);
    const [aDropped, setADropped] = useState(0);

    const [tamp,setTAmp] = useState(0);
    const [tspeaker,setTSpeaker] = useState(0);
    const [tspeakerAmp,setTSpeakerAmp] = useState(0);
    const [tonStage,setTonStange] = useState(0);
    const [tspotlight,setTSpotlight] = useState(0);
    const [tharmony,setTHarmony] = useState(0);
    const [tTrap,setTtrap] = useState(0);
    const [cycleTotal, addCycleTotal] = useState(0);
    const [cycles, setCycles] = useState(0);
    const [cycleTime, setCycleTime] = useState(0);

    const [tPickup, setTPickup] = useState(0);
    const [tDropped, setTDropped] = useState(0);

    const [moved, setMoved] = useState(false);
    const [isParked, setParked] = useState(false);


    const [infoShow, setInfo] = useState(true);
    const [autoShow, setAuto] = useState(false);
    const [teleShow, setTele] = useState(false);
    const [endShow, setEnd] = useState(false);


    const [score, setScore] = useState(0);

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    const checkMatchData = () => {
        if(eventCode.length !== 9)
        {
            return false;
        }
        else if(matchNumber === 0)
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

    const calculateScore = () => {
        let calcScore = 0;
        calcScore = (
            (aAmp * AUTO_AMP_NOTE) +
            (aSpeaker * AUTO_SPEAKER) +
            (tamp * TELE_AMP_NOTE) +
            (tspeaker * TELE_SPEAKER) +
            (tspeakerAmp * TELE_SPEAKER_AMPLIFIED) +
            ((tonStage ? 1 : 0)* TELE_ONSTAGE) +
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
        console.log(score)
    }

    const getMatchID = () => {
        return(eventCode+"_" + (playoff ? "sf" + matchNumber + "m1" : "qm" + matchNumber))
    }

    const startCycle = () => {
        setCurrentTime(new Date().getTime());
        setCanScore(true);
    }

    const endCycle = () => {
        console.log(currentTime)
        console.log(new Date().getTime() - currentTime);
        setCanScore(false);
        return new Date().getTime() - currentTime;
    }

    const CalcCycleTime = () => {
        setCycleTime(cycleTotal/cycles);
    }

    const Submit = () => {

        //calc score here b/c the use state is breaking ill figure it out later just dont have time now and this works
        let calcScore = 0;
        calcScore = (
            (aAmp * AUTO_AMP_NOTE) +
            (aSpeaker * AUTO_SPEAKER) +
            (tamp * TELE_AMP_NOTE) +
            (tspeaker * TELE_SPEAKER) +
            (tspeakerAmp * TELE_SPEAKER_AMPLIFIED) +
            ((tonStage ? 1 : 0)* TELE_ONSTAGE) +
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
        var matchid = getMatchID();
        axios.post(`${api.api}/submit`, {
            eventCode : eventCode,
            matchNumber : matchNumber,
            Matchid : matchid,
            Playoff : playoff,
            teamNumber : teamNumber,
            alliance : alliance,
            position : position,
            A_AMP : aAmp,
            A_Mobility : moved,
            A_Speaker :aSpeaker,
            A_Pickup : aPickup,
            A_Dropped : aDropped,
            T_AMP : tamp,
            T_Speaker : tspeaker,
            T_SpeakerAMP : tspeakerAmp,
            T_Trap : tTrap,
            T_OnStage : tonStage,
            T_Spotlight : tspotlight,
            T_Harmony : tharmony,
            T_Parked : isParked,
            T_Pickup : tPickup,
            T_Dropped : tDropped,
            score : calcScore,
            cycleTime : cycleTime,
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
                <a href='/auth/pit-scouting'>Pit Scout</a>
                <a className='nav-logout' href='/logout'>Logout</a>
            </div>
            <div>
                {infoShow === true && <div className="scouting-data">
                    <h1 className="scouting-text">Match Info</h1>
                    <label className="scouting-text">
                        <p>Event Code</p>
                        <input className="event-code" type="text" placeholder="event code" defaultValue={searchParams.get("code")}onChange={e => setEventCode(e.target.value)}/>
                    </label>
                    <label className="scouting-text">
                        <p>Match Number</p>
                        <input className="match-number" type="number" placeholder="0" defaultValue={searchParams.get("match")}onChange={e => setMatchNumber(e.target.value)}/>
                    </label>
                    <label className="scouting-text">
                        <p>PlayOffs</p>
                        <input className="match-number" type="checkbox" defaultChecked={false}onChange={e => setPlayoffValue(e.target.checked)}/>
                    </label>
                    <label className="scouting-text">
                        <p>Team Number</p>
                        <input className="team-number" type="number" placeholder="0000" defaultValue={searchParams.get("team")}onChange={e => setTeamNumber(e.target.value)}/>
                    </label>
                    <label className="scouting-text">
                        <p>Alliance</p>
                        <select className="bot-alliance" defaultValue={searchParams.get("alliance")}onChange={e => setAlliance(e.target.value)}>
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
                            <button className="continue-button" onClick={() => {setInfo(!checkMatchData()); setAuto(checkMatchData());}}>Continue</button>
                        </label>
                    </div>
                    
                </div>}
                {autoShow === true && <div className="scouting-auto">
                    <h1 className="scouting-text">Autonomous</h1>

                    <div className="scouting-row">
                        <div className="scouting-container">
                            <p className="scouting-text">Game Piece</p>
                            <div className="scouting-pickup">
                                {!canScore && <button className="scouting-pickup" onClick={() => {setAPickup(aPickup+1); setCanScore(true) }}>Picked Up</button>}
                                {/* ik this is a bad solution i just dont know css ¯\_(ツ)_/¯ */}
                                {canScore && <button className="scouting-placehold">hi</button>}
                            </div>
                        </div>        
                        <div className="scouting-container">
                            <p className="scouting-text">Scored</p>
                            <div className="scouting-scored">
                                
                                {canScore && <button className="scouting-scored" onClick={() => {setAAmp(aAmp+1); setCanScore(false);}}>AMP</button>}
                                {canScore && <button className="scouting-scored" onClick={() => {setASpeaker(aSpeaker+1); setCanScore(false);}}>Speaker</button>}
                                {/* ik this is a bad solution i just dont know css ¯\_(ツ)_/¯ */}
                                {!canScore && <button className="scouting-placehold">hi</button>}
                                {!canScore && <button className="scouting-placehold">hi</button>}
                            </div>                           
                        </div>    
                    </div>
                    <div className="scouting-row">
                        <div className="scouting-container">
                            <div className="scouting-dropped">
                                {canScore && <button className="scouting-pickup" onClick={() => {setADropped(aDropped+1); setCanScore(false)}}>Dropped</button>}
                                {/* ik this is a bad solution i just dont know css ¯\_(ツ)_/¯ */}
                                {!canScore && <button className="scouting-placehold">hi</button>}
                            </div>
                        </div>
                    </div>
                    <div className="scouting-row">
                        <div className="scouting-container">
                            <div className="scouting-mobility">
                               {!moved && <button className="scouting-mobility" onClick={() => {setMoved(true);}}>mobility</button>}
                            </div>
                        </div>
                    </div> 
                   


                    {/* {!moved && <div>
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
                    </div>  */}
                    <div>
                        <label className="scouting-text">
                            <button className="continue-button" onClick={() => {setAuto(false); setTele(true);}}>Continue</button>
                        </label>
                    </div>
                                              
                </div>}
                {teleShow  === true && <div className="scouting-tele">
                    <h1 className="scouting-text">Teleop</h1>

                    <div className="scouting-row">
                        <div className="scouting-container">
                            <p className="scouting-text">Game Piece</p>
                            <div className="scouting-pickup">
                                {!canScore &&<button className="scouting-pickup" onClick={() => {setTPickup(tPickup+1); startCycle(); setCanScore(true)}}>Picked Up</button>}
                                {/* ik this is a bad solution i just dont know css ¯\_(ツ)_/¯ */}
                                {canScore && <button className="scouting-placehold">hi</button>}
                            </div>
                        </div>        
                        <div className="scouting-container">
                            <p className="scouting-text">Scored</p>
                            <div className="scouting-scored">
                                
                                {canScore && <button className="scouting-scored" onClick={() => {setTAmp(tamp+1); addCycleTotal(cycleTotal + endCycle()); setCycles(cycles+1);}}>AMP</button>}
                                {canScore &&<button className="scouting-scored" onClick={() => {setTSpeaker(tspeaker+1); addCycleTotal(cycleTotal + endCycle()); setCycles(cycles+1);}}>Speaker</button>}
                                {/* ik this is a bad solution i just dont know css ¯\_(ツ)_/¯ */}
                                {!canScore && <button className="scouting-placehold">hi</button>}
                                {!canScore && <button className="scouting-placehold">hi</button>}
                            </div>                           
                        </div>    
                    </div>
                    <div className="scouting-row">
                        <div className="scouting-container">
                            <div className="scouting-dropped">
                                {canScore && <button className="scouting-pickup" onClick={() => {setTDropped(tDropped+1); setCanScore(false)}}>Dropped</button>}
                                {/* ik this is a bad solution i just dont know css ¯\_(ツ)_/¯ */}
                                {!canScore && <button className="scouting-placehold">hi</button>}
                            </div>
                        </div>
                        <div className="scouting-container">
                            <div className="scouting-scored">
                                
                                {canScore && <button className="scouting-scored" onClick={() => {setTSpeakerAmp(tspeakerAmp+1); addCycleTotal(cycleTotal + endCycle()); setCycles(cycles+1);}}>Amped</button>}
                                {canScore && <button className="scouting-scored" onClick={() => {setTtrap(tTrap+1); addCycleTotal(cycleTotal + endCycle()); setCycles(cycles+1);}}>Trap</button>}
                                {/* ik this is a bad solution i just dont know css ¯\_(ツ)_/¯ */}
                                {!canScore && <button className="scouting-placehold">hi</button>}
                                {!canScore && <button className="scouting-placehold">hi</button>}
                            </div>                           
                        </div>    
                    </div>
                    
                    {/* <div>
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
                    <div>
                        <label className="scouting-text">
                            <button className="scouting-button" onClick={() => {setTtrap(tTrap+1);}}>Scored Trap</button>
                        </label> 
                    </div>    */}
                    {/* <h3 className="scouting-text">End Game</h3>  
                    {!isParked && <div>
                        <label className="scouting-text">
                            <button className="scouting-button" onClick={() => {setParked(true);}}>Parked</button>
                        </label>
                    </div>}
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
                    </div> */}
                    <div>
                        <label className="scouting-text">
                            <button className="continue-button" onClick={() =>{setTele(false); setEnd(true); CalcCycleTime();}}>Continue</button>
                        </label>
                    </div>      
                </div>}
                {endShow && <div className="scouting-tele">
                    <h1 className="scouting-text">End Game</h1>
                    <div className="scouting-row">
                       <div className="scouting-container">
                            <div className="scouting-mobility">
                                {!isParked && <button className="scouting-mobility" onClick={() => {setParked(true);}}>Parked</button>}
                            </div>
                        </div>
                    </div> 
                    <div className="scouting-row">
                        <div className="scouting-container">
                            <div className="scouting-mobility">
                                {!tonStage && <button className="scouting-mobility" onClick={() => {setTonStange(true);}}>On Stage</button>}
                            </div>
                        </div>
                    </div>
                    <div className="scouting-row">
                        <div className="scouting-container">
                            <p className="scouting-text">Harmony</p>
                            <div className="scouting-mobility">
                                <select className="tele-harmony" onChange={e => setTHarmony(e.target.value)}>
                                    <option value={0}>none</option>
                                    <option value={1}>2 bots</option>
                                    <option value={2}>3 bots</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="scouting-text">
                            <button className="continue-button" onClick={() => {Submit()}}>Submit</button>
                        </label>
                    </div>      
                </div>}
            </div>
        </div>     
    );
}