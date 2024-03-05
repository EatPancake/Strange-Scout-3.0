
import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import Scouting from '../Scouting/Scouting';
import SignUp from '../SignUp/SignUp'
import useToken from './useToken';
import Auth from '../isAuth/isAuth';
import Home from '../Home/Home';
import Logout from '../Logout/Logout'
import PitScouting from '../PitScouting/PitScouting'
import Data from '../Data/Data'
import Match from '../Match/Match'
import Team from '../Team/Team';
import EventData from '../EventData/EventData';
import { useContext } from 'react';

function App() {
  const { token, setToken } = useToken();

  // if(token) {
  //   return (  
  //     <Login setToken={setToken}/>
  //   )
  // }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth/>}>
          <Route path='/auth/dashboard' element={<Dashboard/>}/> 
          <Route path='/auth/scouting'element={<Scouting/>}/>
          <Route path='/auth/pit-scouting' element={<PitScouting/>}/>
          <Route path='/auth/data' element={<Data/>}/>
          <Route path='/auth/match' element={<Match/>}/>
          <Route path='/auth/team' element={<Team/>}/>
          <Route path='/auth/event' element={<EventData/>}/>
        </Route>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<Login setToken={setToken}/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path='/logout' element={<Logout/>}/>
      </Routes>
    </BrowserRouter>
  );
  

  
}

export default App;
