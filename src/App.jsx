import './App.css'

// blockchain data
import Web3 from "web3"
import Test from '../src/abis/Test.json'

// components
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// pages
import HomePage from './components/homePage/homePage'
import Nav from './components/nav/nav'
import GalleryPage from './components/gallery/galleryPage'
import LoginPage from './components/loginPage/loginPage'
import RegistrationPage from './components/loginPage/registrationPage'
import ProductPage from "./components/productPage/productPage";
import WalletCard from "./components/wallet/wallet";
import CatalogPage from "./components/contact/catalogPage";


const RouterSwitch = ({ contract, account, trees, mint, totalSupply, accountsTrees }) => {
  return (
      <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/gallery' component={() => (<GalleryPage trees={trees} totalSupply={totalSupply} accountsTrees={accountsTrees}/>)}/>
          <Route path='/login' component={LoginPage}/>
          <Route path='/registration' component={RegistrationPage}/>
          <Route path='/productPage' component={ProductPage}/>
          <Route path='/catalog' component={() =>(<CatalogPage contract={contract} account={account} mint={mint}/>)}/>
      </Switch>
  )
}

const App = () => {
    const [account, setAccount] = useState("")
    const [contract, setContract] = useState(undefined)
    const [totalSupply, setTotalSupply] = useState(0)
    const [trees, setTrees] = useState([])
    const [accountsTrees, setAccountsTrees] = useState([])
    const [accountBalance, setAccountBalance] = useState(0)

    useEffect(async () => {
        console.log("account !!!!: ", account, totalSupply, trees)
        await loadBlockChainData()
    },[])



    useEffect(async ()=> {
        if(window.eth) {
            window.eth.on('chainChanged', () => {
                window.location.reload();
            })
            window.eth.on('accountsChanged', async() => {
                console.log("zmiana acount")
                   await loadWeb3()
                await loadBlockChainData()
            })
        }
        //await loadBlockChainData()

    }, [account])


    const loadWeb3 = async () => {
        if (typeof window.ethereum !== 'undefined') { //czy jest metamask
            console.log('MetaMask is installed!');
            await window.ethereum.enable()
            // const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            // const account = accounts[0];
            // setAccount(account)
            console.log(account, "set account w loadweb3", contract, account)
            //await loadBlockChainData()
            if(contract!=undefined && account!= undefined && account!= ""){
                console.log("kjodsgnvdsfkgvnkdfjsl")
                let balance = await contract.methods.balanceOf(account).call();
                console.log("----------balans: ", balance)
                setAccountBalance(balance)
            }

        }
        // else{ // przekierowanie do metamask
        //     console.log("install Metamask")
        // }

    }

    const loadBlockChainData = async() => {
        console.log("load blockchaindata")
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        //console.log(web3)
        const networkId = await web3.eth.net.getId()
        const networkData = Test.networks[networkId]

        if(networkData){
            const abi = Test.abi
            const address = networkData.address
            const contract = new web3.eth.Contract(abi, address)
            setContract(contract)
            const totalSupply = await contract.methods.totalSupply().call()
            setTotalSupply(totalSupply)
            if(account!=undefined && account!="" && account!="0x0"){
                let balance = await contract.methods.balanceOf(account).call();
                console.log("balans: ", balance)
                setAccountBalance(balance)

                //add current account's trees
                for(var i = 0; i<accountBalance; i++){
                    let tree = await contract.methods.tokenOfOwnerByIndex(account, i).call()
                    console.log(tree, "add current account's trees")
                    setAccountsTrees([...accountsTrees, tree])
                }
                console.log("[[[ ", accountsTrees)
            }

            // add trees to state
            for(var i = 1; i<=totalSupply; i++){
                let tree = await contract.methods.trees(i-1).call()
                setTrees([...trees, tree])
            }

        }
        console.log("ilosc dtrzewek: ", trees, totalSupply)
    }

    const mint = async () => {
        console.log("account ktory kupuje", account)

        if(account!="" && account!= undefined){
            console.log(totalSupply, "total supply przed")
            await contract.methods.mintTree().send({ from: account })
                .once('receipt', (receipt) => {
                    console.log("kupiono drzewk0")
                })
            await loadBlockChainData()
            console.log(totalSupply, "total supply po")
        }

    }



  return (
      <Router>
          <div className='App'>
              <WalletCard account={account} setAccount={setAccount} loadWeb3={async () => {loadWeb3()}}></WalletCard>
              <Nav />
              <RouterSwitch contract={contract} account={account} trees={trees} mint={mint} totalSupply={totalSupply} accountsTrees={accountsTrees}/>

          </div>

      </Router>

  )
}

export default App
