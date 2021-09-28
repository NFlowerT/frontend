import './App.css';

//components
import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

//pages
import HomePage from "./components/home/homePage/homePage";

const RouterSwitch = () => {
  return (
      <Switch>
        <Route path="/home">
          <HomePage/>
        </Route>

      </Switch>
  )
}

const App = () => {
  return (
    <div className="App">
        <HomePage></HomePage>
    </div>
  );
}

export default App;
