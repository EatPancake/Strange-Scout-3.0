import MatchData from "./MatchData"
import axios from 'axios'
import React, { useEffect, useState } from "react"
import api from "../../api.json"

function getData() {
    return axios.get(`${api.api}/getData`,{
            headers: {
                "x-access-token":localStorage.getItem("token")
        }
    })
}

function updateData() {
    axios.get(`${api.api}/updateData`,{
            headers: {
                "x-access-token":localStorage.getItem("token")
        }
    }).then((response) => {return response.data})
}

export default function Data() {

    const sleep = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    const [match, setMatchData] = useState();
    const [sendData, setSendData] = useState(false);

    useEffect(() => {
        async function getReq() {
            setSendData(false);
            await getData().then((response) => {
                setMatchData(response.data)
            });
            
            setSendData(true);
        }
        getReq();
        
    },[])

    return(
        <>
            <div className='topnav'>
                <a href="/home">Home</a>
                <a href='/auth/dashboard'>Dashboard</a>
                <a className='active' href='/auth/data'>Data</a>
                <a href='/auth/scouting'>Scout</a>
                <a href='/auth/pit-scouting'>Pit Scout</a>
                <a className='nav-logout' href='/logout'>Logout</a>
            </div>
            <div className="assign-box">
                <button className="assign-button" onClick={updateData}>Refresh Data</button>
            </div>
            
            {/* <button onClick={() => {sendData = true}}>Test</button> */}
            {sendData ? <MatchData items={match}/> : <h1>Getting Data</h1>}
        </>
    )


    
    

    
    
    
}