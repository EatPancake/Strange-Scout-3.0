
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import Scouting from '../Scouting/Scouting';
import SignUp from '../SignUp/SignUp'
import useToken from './useToken';
import Auth from '../isAuth/isAuth';
import Home from '../Home/Home';
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
        </Route>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<Login setToken={setToken}/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  );
  

  
}

export default App;
