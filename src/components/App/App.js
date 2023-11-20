
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import Scouting from '../Scouting/Scouting';
import SignUp from '../SignUp/SignUp';
import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return (  
      <Login setToken={setToken}/>
    )
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/dashboard'> <Dashboard/> </Route>
        <Route path='/scout'><Scouting/></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
