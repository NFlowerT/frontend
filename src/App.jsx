import './App.css'

// blockchain data
import Web3 from "web3"
const EthereumEvents = require('ethereum-events');
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


const RouterSwitch = ({ contract, account, trees, mint, totalSupply, accountsTrees, accountBalance, putOnSale, treesOnSale }) => {
  return (
      <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/gallery' component={() => (<GalleryPage trees={trees} totalSupply={totalSupply} accountsTrees={accountsTrees} accountBalance={accountBalance} putOnSale={putOnSale}/>)}/>
          <Route path='/login' component={LoginPage}/>
          <Route path='/registration' component={RegistrationPage}/>
          <Route path='/productPage' component={ProductPage}/>
          <Route path='/catalog' component={() =>(<CatalogPage contract={contract} account={account} mint={mint} treesOnSale={treesOnSale}/>)}/>
      </Switch>
  )
}

const App = () => {
    //const [provider, setProvider] = useState(undefined)
    const [account, setAccount] = useState("")
    const [contract, setContract] = useState(undefined)
    const [totalSupply, setTotalSupply] = useState(0)
    const [trees, setTrees] = useState([])
    const [treesOnSale, setTreesOnSale] = useState([])
    const [accountsTrees, setAccountsTrees] = useState([])
    const [accountBalance, setAccountBalance] = useState(0)
    //const [loadData, setLoadData] = useState()


    // useEffect(async() => {
        // if(window.ethereum) {
        //     window.ethereum.on('chainChanged', async() => {
        //         alert("zmiana chaina")
        //         await loadWeb3()
        //         await loadBlockChainData()
        //     })
        //     window.ethereum.on('accountsChanged', async() => {
        //         await loadWeb3()
        //         await loadBlockChainData()
        //     })
        // }
    // setInterval(loadBlockChainData, 10000)
    // })

    useEffect(async ()=> {
        //clearInterval(loadInterval)
        await loadWeb3()
        await loadBlockChainData()
        //let loadInterval=setInterval(loadBlockChainData, 15000)
    }, [account])
    useEffect(()=>{
        console.log(trees)
    },[trees])



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
        if(contract){
            let balance = await contract.methods.balanceOf(account).call();
            console.log("balans: ", balance)
            setAccountBalance(balance)


            //add current account's trees

            let treesTab = []
            try{
                for(var i = 0; i<=totalSupply; i++){
                    let tokenId = await contract.methods.tokenOfOwnerByIndex(account, i).call()
                    let tree = await contract.methods.trees(tokenId).call()
                    let treeObj = {"id":tokenId, "tree":tree}
                    treesTab.push(treeObj)
                }
            }
            catch {
                console.log("koniec drzew")
            }
            finally {
                console.log(treesTab)
                setAccountsTrees([...treesTab])
            }

            // for(var i = 0; ; i++){
            //     let tree = await contract.methods.tokenOfOwnerByIndex(account, i).call()
            //     console.log(tree, "add current account's trees")
            //     setAccountsTrees([...accountsTrees, tree])
            // }
            console.log("[[[ ", accountsTrees)
        }

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

            // const contracts = [{
            //         name: 'HelloWorld',
            //         address: address,
            //         abi:abi,
            //     }];
            // const options = {
            //     pollInterval: 13000, // period between polls in milliseconds (default: 13000)
            //     confirmations: 12,   // n° of confirmation blocks (default: 12)
            //     chunkSize: 10000,    // n° of blocks to fetch at a time (default: 10000)
            //     concurrency: 10,     // maximum n° of concurrent web3 requests (default: 10)
            //     backoff: 1000        // retry backoff in milliseconds (default: 1000)
            // };
            // const ethereumEvents = new EthereumEvents(web3, contracts, options);
            // ethereumEvents.start();
            // alert(ethereumEvents.isRunning())
            // ethereumEvents.on('block.confirmed', (blockNumber, events, done) => {
            //     alert("NOWY BLOK")
            //
            // });
            // ethereumEvents.on('error', err => {
            //
            //     alert("error")
            //
            // });


            //load totalSupply
            const totalSupply = await contract.methods.totalSupply().call()
            setTotalSupply(totalSupply)

            //load requests to mint tree
            // try{
            //     for(var i = 0; ; i++){
            //         let request = await contract.methods.requests(i).call()
            //         console.log(request, "request", i )
            //     }
            // }
            // catch {
            //     console.log("koniec requestów")
            // }


            // load all trees
            let treesTab = []
            try{
                for(var i = 0; i<=totalSupply; i++){
                    let tree = await contract.methods.trees(i).call()

                    let treeObj = {"id":i, "tree":tree}

                    treesTab.push(treeObj)
                }
            }
            catch {
                console.log("koniec drzew")
            }
            finally {
                setTrees([...treesTab])
            }

            if(account!== undefined && account!== "" && account!=="0x"){
                await loadActiveAccountTrees()
            }

            //load trees on sale
            let treesTabOnSale = []
            try{
                for(var i = 0; i<=totalSupply; i++){
                    let tree = await contract.methods.sales(i).call()
                    let treeObj = {"tree":tree}
                    console.log(treeObj, tree, "ONSALE", totalSupply)
                    treesTabOnSale.push(treeObj)
                }
            }
            catch {
                console.log("koniec drzew on sale")
            }
            finally {
                //console.log(treesTabOnSale)
                setTreesOnSale([...treesTabOnSale])
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

                    console.log(totalSupply, "total supply po")
                    await loadWeb3()
                    //await loadBlockChainData()
                })
            // await loadBlockChainData()
            // console.log(totalSupply, "total supply po")
        }
        await loadWeb3()

    }

    const putOnSale = async (tokenId) => {
        console.log("PUT ON SALE", tokenId)
        if(account!="" && account!= undefined && tokenId!==undefined && tokenId!==null){
            console.log("PUT ON SALE")
            await contract.methods.putTreeOnSale(tokenId,Web3.utils.toWei(String(1), 'ether')).send({ from: account})
                .once('receipt', async(receipt) => {
                    console.log("put on sale")

                    await loadWeb3()
                    //await loadBlockChainData()
                })
            // await loadBlockChainData()
            // console.log(totalSupply, "total supply po")
        }
    }



  return (
      <Router>
          <div className='App'>
              <WalletCard account={account} setAccount={setAccount} loadWeb3={loadWeb3} loadBlockChainData={async()=>{await loadBlockChainData()}}></WalletCard>
              <Nav />
              <RouterSwitch contract={contract} account={account} trees={trees} mint={mint} totalSupply={totalSupply} accountsTrees={accountsTrees} accountBalance={accountBalance} putOnSale={putOnSale} treesOnSale={treesOnSale}/>

          </div>

      </Router>

  )
}

export default App
