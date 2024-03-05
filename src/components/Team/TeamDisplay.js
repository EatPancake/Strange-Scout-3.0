import React, { useState } from "react";

export default function TeamDisplay({matches}){

   
    matches = JSON.parse(JSON.stringify(matches))

    return (
        <>
        <table>
            <thread>
                <th className="TeamtableColor" scope="col">Event</th>
                <th className="TeamtableColor" scope="col">Match</th>
                <th className="TeamtableColor" scope="col">TBA</th>
                <th className="TeamtableColor" scope="col">Statbotics</th>
            </thread>
            <tbody>
                {matches.length > 0 ? (
                    <>
            
                        {matches.map((match) =>
                            <tr>
                                <td className="TeamtableColor"><a className="Team-Url" href={`/auth/event/?event=${match.eventid}`}>{match.eventid}</a></td>
                                <td className="TeamtableColor"><a className="Team-Url" href={`/auth/match/?match=${match.Matchid}`}>Match {match.MatchNumber}</a></td>
                                <td className="TeamtableColor"><a className="Team-Url" href={`https://www.thebluealliance.com/match/${match.Matchid}`}>TBA</a></td>
                                <td className="TeamtableColor"><a className="Team-Url" href={`https://www.statbotics.io/match//${match.Matchid}`}>Statbotics</a></td>
                            </tr>
                            
                        )}
                    </>
                ) : (
                    <>

                    </>
                )}
            </tbody>
        </table>
        
        {/* {matches.length > 0 ? (
            <>
            <h3>{matches.length} Matches</h3>
            
                {matches.map((match) =>
                    <div>
                        <a href={`/auth/match/?match=${match.Matchid}`}>Match {match.MatchNumber}</a>
                    </div>
                        
                )}
            </>
        ) : (
            <>

            </>
        )} */}
        </>
    )
}