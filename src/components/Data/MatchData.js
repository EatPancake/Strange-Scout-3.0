import React from "react";
import './MatchData.css' 


const MatchData = ({ items }) => {
    var match = 1
    var blue = [1,2,3]
    var red = [4,5,6]
    console.log(items)
    items = (JSON.parse(JSON.stringify(items)))
    console.log(items.length)



    // return(
    //     <>
    //     <div className="match-data">
    //         <p className="data-text">Match {match}</p>
    //         <label className="data-blue">
                
    //             <p>{blue[0]} {blue[1]} {blue[2]}</p>

    //         </label>
    //         <label className="data-red">
    //             <p>{red[0]} {red[1]} {red[2]}</p>
    //         </label>
    //     </div>
    //     </>
    // )

    return(
        <>
        <table>
            <thead>
                <th className="tableColor" scope="col">Event</th>
                <th className="tableColor" scope="col">Match</th>
                <th className="tableColor" scope="col">Team Number</th>
                <th className="tableColor" scope="col">Score</th>
                <th className="tableColor" scope="col">Alliance</th>
            </thead>
            <tbody>
                {items.length > 0 ? (
                    <>
                        {items.map((item) => 
                                <tr>
                                    <td className="tableColor"><a className="Team-Url" href={`/auth/event/?event=${item.eventid}`}>{item.eventid}</a></td>
                                    <td className="tableColor"><a className="Team-Url" href={`/auth/match/?match=${item.Matchid}`}>{item.MatchNumber}</a></td>
                                    <td className="tableColor"><a className="Team-Url" href={`/auth/team/?team=${item.TeamNumber}`}>{item.TeamNumber}</a></td>
                                    <td className="tableColor">{item.Score}</td>
                                    <td className="tableColor">{item.Alliance ? "red" : "blue"}</td>
                                </tr>
                            )
                        }

                    </>
                ) : (
                    <p>No Current Data</p>
                )}
                
            </tbody>
        </table>
        
        </>
    )
}
export default MatchData;