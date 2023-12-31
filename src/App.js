import './App.css';
import {
  HashRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import MyNavbar from './components/MyNavbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/NoteState';
import { ModeState } from './context/ModeContext';
import { AlertContext } from './context/AlertContext';
import { LoadingBarContext } from './context/LoadingBarContext';
import AlertBox from './components/AlertBox';
import Login from './components/Login';
import Signup from './components/Signup';
import { useContext } from 'react';
import LandingPage from './components/LandingPage';

function App() {

  const { alertinfo, setAlertinfo } = useContext(AlertContext);
  const { progress } = useContext(LoadingBarContext);

  if (alertinfo) {
    setTimeout(() => {
      setAlertinfo(null);
    }, 2500);
  }

  return (
    <>
      <NoteState>
        <ModeState>

          <Router>
            <div>
              <MyNavbar />
              <LoadingBar color='skyblue'progress={progress} height={3.5}/>
              {
                alertinfo && (
                  <AlertBox message={alertinfo.message} color={alertinfo.color} />
                )
              }


              <div className="container">
                <Routes>
                  <Route exact path="/" element={<LandingPage />}></Route>
                  <Route exact path="/home" element={<Home />}></Route>
                  <Route exact path="/login" element={<Login />}></Route>
                  <Route exact path="/signup" element={<Signup />}></Route>
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