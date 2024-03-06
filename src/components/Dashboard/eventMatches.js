import React from "react"
import axios from "axios"
import { response } from "express"
import api from '../../api.json'

function getEventMatches() {
    axios.get(`${api.api}/getMatches`,{

    }).then((response) => {
        return response;
    });
}


const eventMatches = ({ json }) => {
    
}