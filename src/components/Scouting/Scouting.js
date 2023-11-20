import React , { useEffect, useState } from "react";


//points
const Mobility_A = 3;
const Top_A = 6;
const Mid_A = 4;
const Bot_A = 3;
const Docked_A = 8;
const Engaged_A = 12;

const Top_T = 5;
const Mid_T = 3;
const Bot_T = 2;
const Line_T = 5;

const Docked_E = 6;
const Engaged_E = 10;
const Parked_E = 2;

let points;

function addValue(value)
{
    points += value;
}

export default function Scouting() {
    
   

    return(
        <div className="scouting">



            <h1>Scouting</h1>
           
            <h2 id="point-display">Points </h2>
            <div className="Scouting-Form">
                <form>
                    <div className="auto">
                        <h3>Autonomous</h3>
                        <input className="Cone_A" value={0}></input>
                        <button onClick={addValue(Top_A)}></button>
                    </div>
                    
                    <div className="tele">
                        <h3>Teleop</h3>
                    </div>
                   
                    <div className="endg">
                        <h3>End Game</h3>
                    </div>

                    <div className="submit">
                        <input type="text" className="point-holder" value={0}></input>
                        <button type="submit">Submit</button>
                    </div>
                    
                </form>
            </div>
        </div>
        
    )
}