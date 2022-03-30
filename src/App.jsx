import './App.css'

// blockchain data
import Web3 from "web3"
import Test from '../src/abis/Test.json'
import HelloWorld from '../src/abis/HelloWorld.json'

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


const RouterSwitch = ({ contract, account, trees, mint, totalSupply, accountsTrees, accountBalance }) => {
  return (
      <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/gallery' component={() => (<GalleryPage trees={trees} totalSupply={totalSupply} accountsTrees={accountsTrees} accountBalance={accountBalance}/>)}/>
          <Route path='/login' component={LoginPage}/>
          <Route path='/registration' component={RegistrationPage}/>
          <Route path='/productPage' component={ProductPage}/>
          <Route path='/catalog' component={() =>(<CatalogPage contract={contract} account={account} mint={mint}/>)}/>
      </Switch>
  )
}

const App = () => {
    const [provider, setProvider] = useState(undefined)
    const [account, setAccount] = useState("")
    const [contract, setContract] = useState(undefined)
    const [totalSupply, setTotalSupply] = useState(0)
    const [trees, setTrees] = useState([])
    const [accountsTrees, setAccountsTrees] = useState([])
    const [accountBalance, setAccountBalance] = useState(0)

    useEffect(async() => {
        if(window.ethereum) {
            window.ethereum.on('chainChanged', async() => {
                await loadWeb3()
                await loadBlockChainData()
            })
            window.ethereum.on('accountsChanged', async() => {
                await loadWeb3()
                await loadBlockChainData()
            })
        }})

    useEffect(async ()=> {
        await loadWeb3()
        await loadBlockChainData()
    }, [account])


    const loadWeb3 = async () => {
        if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
            await window.ethereum.enable()

            // await loadBlockChainData()

            //load active account's balance and trees
            if(contract!==undefined && account!== undefined && account!== "" && account!=="0x"){
                await loadActiveAccountTrees()

            }
        }
        else{
            console.log("install Metamask")
        }


    }
    const loadActiveAccountTrees = async () => {
        console.log("load my trees and balance")
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

    const loadBlockChainData = async() => {
        console.log("load blockchaindata", account)
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

        const networkId = await web3.eth.net.getId()
        const networkData = HelloWorld.networks[networkId]

        if(networkData){
            const abi = HelloWorld.abi
            const address = networkData.address

            //load contract
            const contract = new web3.eth.Contract(abi, address)
            setContract(contract)

            //load totalSupply
            const totalSupply = await contract.methods.totalSupply().call()
            setTotalSupply(totalSupply)

            //load requests to mint tree
            try{
                for(var i = 0; ; i++){
                    let request = await contract.methods.requests(i).call()
                    console.log(request, "request", i )
                }
            }
            catch {
                console.log("koniec requestów")
            }


            // load all trees
            try{
                let treesTab = []
                for(var i = 0; i<=totalSupply; i++){
                    let tree = await contract.methods.trees(i).call()
                    treesTab.push(tree)
                }
                setTrees(treesTab)
            }
            catch {
                console.log("koniec drzew")
            }

            if(account!== undefined && account!== "" && account!=="0x"){
                await loadActiveAccountTrees()
            }
        }
    }

    const mint = async () => {
        console.log("account ktory kupuje", account)

        if(account!="" && account!= undefined){
            console.log(totalSupply, "total supply przed")
            await contract.methods.requestTree().send({ from: account, value: Web3.utils.toWei(String(1), 'ether')})
                .once('receipt', async(receipt) => {
                    console.log("kupiono drzewk0")
                    await loadBlockChainData()
                    console.log(totalSupply, "total supply po")
                    await loadWeb3()
                })
            // await loadBlockChainData()
            // console.log(totalSupply, "total supply po")
        }
        await loadWeb3()

    }



  return (
      <Router>
          <div className='App'>
              <WalletCard account={account} setAccount={setAccount} loadWeb3={loadWeb3} loadBlockChainData={async()=>{await loadBlockChainData()}}></WalletCard>
              <Nav />
              <RouterSwitch contract={contract} account={account} trees={trees} mint={mint} totalSupply={totalSupply} accountsTrees={accountsTrees} accountBalance={accountBalance}/>

          </div>

      </Router>

  )
}

export default App
