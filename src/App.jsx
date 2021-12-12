import './App.css'
import Web3 from "web3"

// components
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// pages
import HomePage from './components/home/homePage'
import Nav from './components/nav/nav'
import GalleryPage from './components/gallery/galleryPage'
import LoginPage from './components/loginPage/loginPage'
import RegistrationPage from './components/loginPage/registrationPage'
import ProductPage from "./components/productPage/productPage";
import WalletCard from "./components/wallet/wallet";


const RouterSwitch = () => {
  return (
      <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/gallery' component={GalleryPage}/>
          <Route path='/login' component={LoginPage}/>
          <Route path='/registration' component={RegistrationPage}/>
          <Route path='/productPage' component={ProductPage}/>
      </Switch>
  )
}


const App = () => {
    // const [account, setAccount] = useState("")
    // // s
    // useEffect(() => {
    //     console.log("account !!!!: ", account)
    // })
    //
    // useEffect(async ()=> {
    //     if(window.ethereum) {
    //         window.ethereum.on('chainChanged', () => {
    //             window.location.reload();
    //         })
    //         window.ethereum.on('accountsChanged', () => {
    //             console.log("zmiana acount")
    //              loadBlockchainData(setAccount)
    //         })
    //     }
    //     //loadBlockchainData(setAccount)
    // }, [account])


    // const loadBlockchainData = async(setAccount) => {
    //     if (typeof window.ethereum !== 'undefined') { //czy jest metamask
    //         console.log('MetaMask is installed!');
    //         const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    //         const account = accounts[0];
    //         setAccount(account)
    //         console.log(account)
    //     }
    //     else{ // przekierowanie do metamask
    //         console.log("install Metamask")
    //     }
    //
    // }


  return (
      <Router>
          <div className='App'>
              {/*<WalletCard></WalletCard>*/}
              <Nav />
              <RouterSwitch />

          </div>

      </Router>

  )
}

export default App
