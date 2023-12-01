import React from "react"
import './Home.css'

export default function Home() {
    return(
        <div>
            <div className="topnav">
                <a className="active" href="/home">Home</a>
                <a href="/login">Login</a>
                <a href="/signup">Sign-up</a>
            </div>
        
            <h1>Strange Scout</h1>

            <div>
                <p>
                    Strange Scout was made as a central point for 1533 Triple Strange's Scouting.  
                    Our goal was to collect detailed data with the least effort for our scouting
                    team. Meaning no paper scouting and manual input. We are able to as well collect
                    more data like cycle time. Not only do we wish to collect data but be able to
                    compare with statbotics. Strange Scout is being developed to make scouting effective
                    and painless.
                </p>

            </div>

        </div>
        
    )
}