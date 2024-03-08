# Strange Scout 3.0

1533 Triple Strange's Scouting App

## What is Strange Scout

Strange Scout is intended to replace paper scouting. As well as make it easy to collect and interpret data. Strange Scout is made with React and NodeJS it also uses a MySQL database. Currently, the files to create the needed tables do not exist these will be added soon. 

## Features 
- Accounts
  - Keep track of who is doing what
  - Assign Matches to people
- Match assigning
  - Allows to assign matches to people quickly
  - Only Accounts that are marked can assign matches
- Scouting
  - Separated Auto Teleop and End game menus
  - Asked when a game piece is picked up and where its scored
- Data Viewing
  - Table of all bots and matches scouted
  - Can click on team, event, match, etc to get more info on each
- Pit Scouting (WIP)
 - Input simple data such as perimeter weight and how teams can score
 - Will allow for autos to be drawn out

## How to use
First, the dependencies need to be installed with ```npm install```.<br/>
Next, the project needs to be built with ```npm run build```. Then move the output to your web server<br/>
Finally, to start the api go into the server directory and run ```node server.js```. <br/>

