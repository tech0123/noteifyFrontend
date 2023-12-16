import './App.css';
import {
  HashRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import MyNavbar from './components/MyNavbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/NoteState';
import { ModeState } from './context/ModeContext';
import AlertBox from './components/AlertBox';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import LandingPage from './components/LandingPage';

function App() {
  

  
  const [alertInfo, setAlertInfo] = useState(null);

  const setAlert = (info) => {
    setAlertInfo(info);
    setTimeout(() => {
      setAlertInfo(null);
    }, 2500);
  };


  return (
    <>
      <NoteState>
        <ModeState>  
          <Router>
            <div>
              <MyNavbar />
              {alertInfo && (
                <AlertBox message={alertInfo.message} color={alertInfo.color} />
              )}
              <div className="container">
                <Routes>
                  <Route exact path="/" element={<LandingPage />}></Route>
                  <Route exact path="/home" element={<Home setAlert={setAlert} />}></Route>
                  <Route exact path="/login" element={<Login setAlert={setAlert} />}></Route>
                  <Route exact path="/signup" element={<Signup setAlert={setAlert} />}></Route>
                  <Route exact path="/about" element={<About />}></Route>
                </Routes>
              </div>
            </div>
          </Router>
        </ModeState>  
      </NoteState>
    </>
  );
}

export default App;