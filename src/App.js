import './App.css'

// components
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// pages
import HomePage from './components/home/homePage/homePage'
import Nav from './components/nav/nav'
import GalleryPage from './components/gallery/galleryPage'
import LoginPage from './components/loginPage/loginPage'
import RegistrationPage from './components/loginPage/registrationPage'

const RouterSwitch = () => {
  return (
      <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/gallery' component={GalleryPage}/>
          <Route path='/login' component={LoginPage}/>
          <Route path='/registration' component={RegistrationPage}/>
      </Switch>
  )
}

const App = () => {
  return (
      <Router>
          <div className='App'>
              <Nav />
              <RouterSwitch />
          </div>

      </Router>

  )
}

export default App
