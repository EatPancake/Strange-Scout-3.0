import React, { createRef, useState } from "react";
import { ReactSketchCanvas } from 'react-sketch-canvas';
import axios from "axios";
import './PitScouting.css'
import auto from './auto';
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

    const [autoImage, setAutoImage] = useState("");

    const [note, SetNote] = useState("");


    const [cansubmit, setCanSubmit] = useState(false);

    const checkCanSubmit = () => {
        if(eventCode.length >= 9 && teamNumber > 0 && cansubmit === false)
        {
            setCanSubmit(true);
        }
    }

    const canvasRef = createRef();


    const submit = () => {
        axios.post("http://localhost:8080/submitPit", {
            eventCode : eventCode,
            teamNumber : teamNumber,
            weight : weight,
            perimeter : perimeter,
            amp : amp,
            speaker : speaker,
            onStage : onStage,
            trap : trap,
            note : note,
            autoImages : autoImage.toString()
        },{
            headers:{
                "x-access-token":localStorage.getItem("token")
            }
        })
    }

    const styles = {
       
    };

    checkCanSubmit();

    return(
        <div>
            <div className='topnav'>
                <a href="/home">Home</a>
                <a href='/auth/dashboard'>Dashboard</a>
                <a href='/auth/data'>Data</a>
                <a href='/auth/scouting'>Scout</a>
                <a className='active' href='/auth/pit-scouting'>Pit Scout</a>
                <a className='nav-logout' href='/logout'>Logout</a>
            </div>
            <div className="pitscout-info">
                <h1 className="scouting-text">Match Info</h1>
                <label className="scouting-text">
                    <p>Event Code</p>
                    <input className="event-code" type="text" placeholder="event code" onChange={e => setEventCode(e.target.value)}/>
                </label>
                <label className="scouting-text">
                    <p>Team Number</p>
                    <input className="team-number" type="number" placeholder="0000" onChange={e => setTeamNumber(e.target.value)}/>
                </label>
            </div>
            <div className="pitscout-botinfo">
                <h1 className="scouting-text">Bot Info</h1>
                <div className="pit-input">
                    <input className="pit-weight" type="number" onChange={e => setWeight(e.target.value)}/>
                    <label className="pit-text">Weight(lbs)</label>
                </div>
                <div className="pit-input">
                    <input className="pit-perimeter" type="number" onChange={e => setPerimeter(e.target.value)}/>
                    <label className="pit-text">Perimeter(in)</label>
                </div>
                <div className="pit-input ">
                    <input className="pit-amp pit-input" type="checkbox" onChange={e => setAmp(e.target.checked)}/>
                    <label className="pit-text">Amp</label>
                </div>
                <div className="pit-input">
                    <input className="pit-speaker pit-input" type="checkbox" onChange={e => setSpeaker(e.target.checked)}/>
                    <label className="pit-text">Speaker</label>
                </div>
                <div className="pit-input">
                    <input className="pit-onStage pit-input"type="checkbox" onChange={e => setOnstage(e.target.checked)}/>
                    <label className="pit-text">On Stage</label>
                </div>
                <div className="pit-input">
                    <input className="pit-trap pit-input" type="checkbox" onChange={e => setTrap(e.target.checked)}/>
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
                        ref={canvasRef}
                        backgroundImage={field}
                        preserveBackgroundImageAspectRatio="true"
                        width="100%"
                        style={styles}
                       
                        strokeWidth={4}
                        strokeColor="red"
                    />
                    <button
                        onClick={() => {
                            canvasRef.current
                                .exportImage("png")
                                .then(data=> {
                                    console.log(data);
                                    setAutoImage((prev) => [prev,data]);
                                })
                                .catch(e => {
                                    console.log(e);
                                });
                        }}> Get image</button>
                </div>
            </div>    
            <div>
                <h1 className="scouting-text">Notes</h1>
                <input className="pit-notes" type="text" onChange={e => SetNote(e.target.value)}></input>
            </div> 
            <div>
                {cansubmit && <button onClick={submit}> submit</button>}
            </div> 
        </div>
    )
}