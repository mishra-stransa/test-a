import React from 'react';
import './App.css';
import {AuthContext} from './AuthContext';

function App() {
  const {logout, token} = React.useContext(AuthContext);

  return (
   token ? <div className="App">
   <header className="App-header">
     <p>App A Authenticated!</p>
     <button onClick={logout}>Sign out</button>
   </header>
 </div> : <></>
  );
}

export default App;
