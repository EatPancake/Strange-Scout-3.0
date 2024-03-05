import axios from "axios";
import EventDisplay from "./EventDisplay";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function EventData() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [event, setEvent] = useState(searchParams.get("event"));

    const [data, setData] = useState();
    const [statbotics, setStatbotics] = useState();


    useEffect(() => {
        async function getEvent() {
            return await axios.get("http://localhost:8080/getEvent", {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                    "event" : event
                },
            }).then((res) => {
                setData(res.data);
                setStatbotics(getStatbotics());
            })
        }
        getEvent();
    },[])

    const getStatbotics = async function() {
        const sb = await axios.get(`https://api.statbotics.io/v3/event/${event}`);
        console.log(sb)
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
            <h1 className="Team-Text">Event {event}</h1>
            
            {data ? <EventDisplay matches={data}/> : <p>L</p>}
        </div>
    )
}