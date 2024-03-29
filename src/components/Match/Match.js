import React, {useEffect, useState} from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import './Match.css'
import api from '../../api.json'

export default function Match() {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const [matchid, setMatchId] = useState(searchParams.get("match"));
    const [data, setData] = useState();

    const [statbotics, setStatbotics] = useState();

    const [sbRed0, setSbRed0] = useState();
    const [sbRed1, setSbRed1] = useState();
    const [sbRed2, setSbRed2] = useState();

    const [sbBlue0, setSbBlue0] = useState();
    const [sbBlue1, setSbBlue1] = useState();
    const [sbBlue2, setSbBlue2] = useState();


    const [sbWinner, setSbWinner] = useState();
    const [sbRedScore, setSbRedScore] = useState();
    const [sbBlueScore, setSbBlueScore] = useState();

    useEffect(() => {
        async function getMatch() {
            return await axios.get(`${api.api}/getMatch`, {
                headers : {
                    "x-access-token": localStorage.getItem("token"),
                    "matchid" : matchid 
                }
            }).then((res) => {
                setData(res.data);
                setStatbotics(getStatbotic());
            })
            
        }
        getMatch();
    },[])

    const getStatbotic = async function() {
        const sb = await axios.get(`https://api.statbotics.io/v3/match/${matchid}`);
        console.log(sb);
        setSbRed0(sb.data.alliances.red.team_keys[0]);
        setSbRed1(sb.data.alliances.red.team_keys[1]);
        setSbRed2(sb.data.alliances.red.team_keys[2]);

        setSbBlue0(sb.data.alliances.blue.team_keys[0]);
        setSbBlue1(sb.data.alliances.blue.team_keys[1]);
        setSbBlue2(sb.data.alliances.blue.team_keys[2]);


        setSbWinner(sb.data.result.winner);
        setSbRedScore(sb.data.result.red_score);
        setSbBlueScore(sb.data.result.blue_score);
    }

    return(
        <>
            <div className="Match">
                <div className='topnav'>
                    <a href="/home">Home</a>
                    <a href='/auth/dashboard'>Dashboard</a>
                    <a className='active' href='/auth/data'>Data</a>
                    <a href='/auth/scouting'>Scout</a>
                    <a href='/auth/pit-scouting'>Pit Scout</a>
                    <a className='nav-logout' href='/logout'>Logout</a>
                </div>

                <h1 className="Team-Text">{matchid}</h1>
                <h3 className="Team-Text">Teams</h3>
                <div className="Match-Teams">
                    <div className="Match-Red">
                        <a className="Match-Url" href={`/auth/team/?team=${sbRed0}`}>{sbRed0}</a>
                        <a className="Match-Url" href={`/auth/team/?team=${sbRed1}`}>{sbRed1}</a>
                        <a className="Match-Url" href={`/auth/team/?team=${sbRed2}`}>{sbRed2}</a>
                    </div>
                    <div className="Match-Blue">
                        <a className="Match-Url" href={`/auth/team/?team=${sbBlue0}`}>{sbBlue0}</a>
                        <a className="Match-Url" href={`/auth/team/?team=${sbBlue1}`}>{sbBlue1}</a>
                        <a className="Match-Url" href={`/auth/team/?team=${sbBlue2}`}>{sbBlue2}</a>
                    </div>
                </div>
                <h3 className="Team-Text">Score</h3>
                <div className="Match-Score">
                    <p className="Match-Score-Red">{sbRedScore}</p>
                    <p className="Match-Score"> - </p>
                    <p className="Match-Score-Blue">{sbBlueScore}</p>
                </div>
            </div>
        </>
    )
}