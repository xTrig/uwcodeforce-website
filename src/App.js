import './App.css';

import Home from './components/Home/Home'
import Head from './components/Head/Head';
import Contact from './components/Contact/Contact';
import Challenges from './components/Challenges/Challenges';
import TestPage from './components/TestPage/TestPage';
import Profile from './components/Profile/Profile';
import Signup from './components/Signup/Signup';
import Footer from './components/Footer/Footer.component';
import {useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
// import ppt from './codeforceppt.pdf';


const App = () => {

  const [signedIn, setSignedIn] = useState();
  return (
    <div className="fullscreen">
      <Router>
        <Head signedIn={signedIn} setSignedIn={setSignedIn}/>
        <Switch>
          <Route path="/signup"><Signup /></Route>
          <Route path="/profile"><Profile /></Route>
          <Route path="/testpage"><TestPage /></Route>
          <Route path="/challenges"><Challenges signedIn={signedIn}/></Route>
          <Route path="/contact"><Contact/></Route>
          <Route path="/"><Home/></Route>
          <Route path="*">
            <Redirect to="/"/>
          </Route>
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;