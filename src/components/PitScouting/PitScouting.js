import React, { useState } from "react";
import { ReactSketchCanvas } from 'react-sketch-canvas';
import './PitScouting.css'
import field from '../imgs/2024Field.png'

export default function PitScouting() {

    const [eventCode, setEventCode] = useState("");
    const [teamNumber, setTeamNumber] = useState(0);

    const [weight, setWeight] = useState(0);
    const [perimeter, setPerimeter] = useState(0);

    const [amp, setAmp] = useState(false);
    const [speaker, setSpeaker] = useState(false);
    const [onStage, setOnstage] = useState(false);
    const [trap, setTrap] = useState(false)

    const styles = {
       
      };


    return(
        <div>
            <div className='topnav'>
                <a href="/home">Home</a>
                <a href='/auth/dashboard'>Dashboard</a>
                <a href='/auth/scouting'>Scout</a>
                <a className='active' href='/auth/pit-scouting'>Pit Scout</a>
                <a className='nav-logout' href='/logout'>Logout</a>
            </div>
            <div className="pitscout-info">
                <h1 className="scouting-text">Match Info</h1>
                <label className="scouting-text">
                    <p>Event Code</p>
                    <input className="event-code" type="text" placeholder="event code"/>
                </label>
                <label className="scouting-text">
                    <p>Team Number</p>
                    <input className="team-number" type="number" placeholder="0000"/>
                </label>
            </div>
            <div className="pitscout-botinfo">
                <h1 className="scouting-text">Bot Info</h1>
                <div className="pit-input">
                    <input className="pit-weight" type="number"/>
                    <label className="pit-text">Weight(lbs)</label>
                </div>
                <div className="pit-input">
                    <input className="pit-perimeter" type="number"/>
                    <label className="pit-text">Perimeter(in)</label>
                </div>
                <div className="pit-input ">
                    <input className="pit-amp pit-input" type="checkbox"/>
                    <label className="pit-text">Amp</label>
                </div>
                <div className="pit-input">
                    <input className="pit-speaker pit-input" type="checkbox"/>
                    <label className="pit-text">Speaker</label>
                </div>
                <div className="pit-input">
                    <input className="pit-onStage pit-input"type="checkbox"/>
                    <label className="pit-text">On Stage</label>
                </div>
                <div className="pit-input">
                    <input className="pit-trap pit-input" type="checkbox"/>
                    <label className="pit-text">Trap</label>
                </div>    
            </div>
            <div>
                <h1 className="scouting-text">Autos</h1>
                <div>
                    <button className="auto-add">Add Auto</button>
                </div>
                <div className="drawing-area">
                    
                    <ReactSketchCanvas
                        backgroundImage={field}
                        preserveBackgroundImageAspectRatio="true"
                        width="100%"
                        style={styles}
                       
                        strokeWidth={4}
                        strokeColor="red"
                    />
                </div>
            </div>    
            <div>
                <h1 className="scouting-text">Notes</h1>
                <input></input>
            </div>  
        </div>
    )
}