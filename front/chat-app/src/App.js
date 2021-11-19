import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Signin from './pages/Signin';
import { root } from "./context/API"
import { useContext } from 'react';
import AdminPanel from './pages/AdminPanel';

import Admin from "./context/admin"

function App() {

  const { state } = useContext(root)
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {state === true ? <Home /> : <Login />}
        </Route>
        <Route exact path="/signin">
          <Signin />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/admin">
          <Admin>
            <AdminPanel />
          </Admin>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
