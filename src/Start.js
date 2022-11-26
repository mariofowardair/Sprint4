import './Start.css';
import Sidebar from './Components/Sidebar';
import {BrowserRouter as Router, Switch, Route, Routes} from 'react-router-dom'
import {useEffect} from 'react';

function Start() {
  const logoStyles = { width: "83%", height: "60%", position: "absolute", right: 0, bottom: 110};
  const buzzStyle = { position: "absolute", left: 55, bottom: 200};
  /*useEffect(() => {
    window.open("https://xyz.abc/", "_self", "");
    console.log("open window");
  }, []);*/
  return (
    <div className="App">
        <Sidebar />
      <header className="App-header">
        <img src="https://ideas.gatech.edu/sites/default/files/buzz-placeholder_189.jpg" className="App-logo" alt="logo" style={buzzStyle}/>
        <img src="https://brand.gatech.edu/sites/default/files/inline-images/GeorgiaTech_RGB.png" className="App-logo" alt="logo" style={logoStyles}/>
      </header>
    </div>

  );
}

export default Start;
