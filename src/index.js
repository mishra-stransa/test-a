import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import App from './App';
import AuthContextProvider from './AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
    <BrowserRouter>
         <Switch>
             {/* <Route path="/login" component={() => window.location.href = `${process.env.REACT_APP_AUTHENTICATOR_URL}/login/redirect=http://localhost:3001`} /> */}
             <Route exact={true} path="/" component={App} />
             <Route component={App} />
         </Switch>
     </BrowserRouter>
  </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
