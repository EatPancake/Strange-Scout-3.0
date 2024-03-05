import axios from "axios";
import TeamDisplay from "./TeamDisplay";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import './Team.css'

export default function Team() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [team, setTeam] = useState(searchParams.get("team"));
    const [year, setYear] = useState(searchParams.get("year") ? searchParams.get("year") : new Date().getFullYear())

    const [data, setData] = useState();
    const [statbotics, setStatbotics] = useState();

    const [sbAuto, setSbAuto] = useState();
    const [sbTele, setSbTele] = useState();
    const [sbEnd, setSbEnd] = useState();
    const [sbTotal, setSbTotal] = useState();

    const [AvgScore, SetAvgScore] = useState();
    const [AvgCycle, SetAvgCycle] = useState();
    const [Acc, setAcc] = useState();

    useEffect(() => {
        async function getTeam() {
            return await axios.get("http://localhost:8080/getTeam", {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                    "team" : team
                },
            }).then((res) => {
                setData(res.data);
                getAvgScore(res);
                getAvgCycle(res);
                getAcc(res);
                setStatbotics(getStatbotics());
            })
        }
        getTeam();
    },[])

    const getAvgScore = (res) => {
        let score = 0;
        for(let i = 0; i < res.data.length; i++)
        {
            score += res.data[i].Score;
        }
        SetAvgScore((score/res.data.length).toFixed(0));
    }
    const getAvgCycle = (res) => {
        let ct = 0;
        for(let i = 0; i < res.data.length; i++)
        {
            ct += res.data[i].CycleTime;
        }
        SetAvgCycle(((ct/res.data.length)/1000).toFixed(2));
    }
    const getAcc = (res) => {
        let picked = 0;
        let dropped =0;
        for(let i = 0; i < res.data.length; i++)
        {
            picked += res.data[i].T_Pickup;
            dropped += res.data[i].T_Dropped;
        }
        setAcc(picked/dropped);
    }

    const getStatbotics = async function() {
        const sb = await axios.get(`https://api.statbotics.io/v3/team_year/${team}/${year}`);
        console.log(sb)
        setSbAuto(sb.data.epa.breakdown.auto_points.mean);
        setSbTele(sb.data.epa.breakdown.teleop_points.mean);
        setSbEnd(sb.data.epa.breakdown.endgame_points.mean);
        setSbTotal(sb.data.epa.breakdown.total_points.mean);
    }

    return(
        
        <div className="Team">
            <div className='topnav'>
                <a href="/home">Home</a>
                <a href='/auth/dashboard'>Dashboard</a>
                <a className='active' href='/auth/data'>Data</a>
                <a href='/auth/scouting'>Scout</a>
                <a href='/auth/pit-scouting'>Pit Scout</a>
                <a className='nav-logout' href='/logout'>Logout</a>
            </div>
            <h1 className="Team-Text">Team {team}</h1>
            
            <div className="Team-Data">
                <h3 className="Team-Text">Strange Scout Data</h3>
                <div className="Team-Score">
                    <p className="Team-Text">Avg Score {AvgScore}</p>
                </div>
                <div className="Team-Score">
                    <p className="Team-Text">Avg Cycle Time {AvgCycle}</p>
                </div>
                <div className="Team-Score">
                    <p className="Team-Text"> Acc {Acc}%</p>
                </div>
            </div>
            <div className="Team-Data">
                <h3 className="Team-Text">Statbotics Epa</h3>
                <div className="Team-Score">
                    <p className="Team-Text">Auto {sbAuto}</p>
                </div>
                <div className="Team-Score">
                    <p className="Team-Text">Teleop{sbTele}</p>
                </div>
                <div className="Team-Score">
                    <p className="Team-Text"> End Game {sbEnd}</p>
                </div>
                <div className="Team-Score">
                    <p className="Team-Text">Total {sbTotal}</p>
                </div>
            </div>
            {data ? <TeamDisplay matches={data}/> : <p>L</p>}
        </div>
    )
}