import React from 'react';
import './App.css';
import PartySelector from './PartySelector';
import topIvy from './images/ivy.png';
import lupine from './images/lupine.jpg';

function App() {
  return (
    <div className="App">
      <div class="contents">
        <h1>
          The wedding of
          <br />
          Katherine Winston Stewart & Glen Nathaniel Merritt
        </h1>
        <h2>August 3rd, 2019 | Caswell Farm, Gray, ME</h2>
        <h2>4:30 in the afternoon</h2>
        <h3>Dinner and dancing to follow</h3>
        <PartySelector />
      </div>
      <img src={topIvy} className="ivy tr" alt="" />
      <img src={lupine} className="ivy bl" alt="" />
    </div>
  );
}

export default App;
