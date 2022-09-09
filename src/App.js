import React from 'react';
import './App.css';
import Canvas from './components/Canvas';


function App() {

  window.onorientationchange = (e)=>{window.location.reload()}



  return (
    <div className="App">
      <div style={{width:"600px", height:"600px", backgroundColor:'black'}}>
     <Canvas />
      </div>
    </div>
  );
}

export default App;
