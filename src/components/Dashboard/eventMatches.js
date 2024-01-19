import React from "react"
import axios from "axios"
import { response } from "express"

function getEventMatches() {
    axios.get("http://localhost:8080/getMatches",{

    }).then((response) => {
        return response;
    });
}


const eventMatches = ({ json }) => {
    
}