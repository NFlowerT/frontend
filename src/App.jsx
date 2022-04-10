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
import * as net from "net";


const RouterSwitch = ({ contract, account, trees, mint, totalSupply, accountsTrees, accountBalance, putOnSale, treesOnSale, buyTreeFromSale, endSale }) => {
  return (
      <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/gallery' component={() => (<GalleryPage
              trees={trees}
              totalSupply={totalSupply}
              accountsTrees={accountsTrees}
              accountBalance={accountBalance}
              putOnSale={putOnSale}
              endSale={endSale}/>)}/>
          <Route path='/login' component={LoginPage}/>
          <Route path='/registration' component={RegistrationPage}/>
          <Route path='/productPage' component={ProductPage}/>
          <Route path='/catalog' component={() =>(<CatalogPage
              contract={contract}
              account={account} mint={mint}
              treesOnSale={treesOnSale}
              buyTreeFromSale={buyTreeFromSale}
            />)}/>
      </Switch>
  )
}

const App = () => {
    //const [provider, setProvider] = useState(undefined)
    const [web3, setWeb3] = useState()
    const [account, setAccount] = useState(undefined)
    const [contract, setContract] = useState(undefined)
    const [networkData, setNetworkData] = useState(undefined)
    const [totalSupply, setTotalSupply] = useState(0)
    const [trees, setTrees] = useState([])
    const [treesOnSale, setTreesOnSale] = useState([])
    const [accountsTrees, setAccountsTrees] = useState([])
    const [accountBalance, setAccountBalance] = useState(0)
    //const [loadData, setLoadData] = useState()

    //load web3
    useEffect(async()=>{
        console.log("useeff loas")
        loadWeb3()
    }, [])


    // useEffect(async() => {
    //     if(window.ethereum) {
    //         // window.ethereum.on('chainChanged', async() => {
    //         //     alert("zmiana chaina")
    //         //     await loadWeb3()
    //         //     await loadBlockChainData()
    //         // })
    //         // window.ethereum.on('accountsChanged', async() => {
    //         //     await loadWeb3()
    //         //     await loadBlockChainData()
    //         // })
    //     }
    // // setInterval(loadBlockChainData, 10000)
    // })

    // useEffect(async ()=> {
    //     //clearInterval(loadInterval)
    //     await loadWeb3()
    //     //await loadBlockChainData()
    //     //let loadInterval=setInterval(loadBlockChainData, 15000)
    // }, [account])

    // useEffect(()=>{
    //     console.log(trees)
    // },[trees])

    useEffect(async()=>{
        if(web3!==undefined){
            console.log(web3)
            const networkId = await web3.eth.net.getId()
            const network = HelloWorld.networks[networkId]
            setNetworkData(network)
            // Initializing web3.eth method
            var block = web3.eth.getBlockNumber().then(console.log);
        }

    }, [web3])

    useEffect(async()=>{
        console.log(networkData, account)
        if(networkData!==undefined ){
            await loadBlockChainData()
            //load active account's balance and trees
            // if(contract!==undefined ){
            //     console.log("use effect network")
            //     await loadActiveAccountTrees()
            //
            // }
        }

    }, [networkData])
    useEffect(()=>{
        loadTrees()
        smartContractListener()
    }, [contract])

    useEffect(async()=>{
        await changeAccountHandler()
    }, [account])

    const changeAccountHandler = async()=>{
        if(account!==undefined && account!=="" && account!=="0x0"){
            await loadActiveAccountTrees()

        }
    }

    const loadWeb3 = async () => {
        if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
            await window.ethereum.enable()
        }
        else{
            console.log("install Metamask")
        }

        setWeb3(new Web3(Web3.givenProvider || "ws://localhost:7545"))

    }
    const smartContractListener = async() =>{
        console.log("listeming", contract)
        if(contract){

            contract.events.Transfer({}, async(error, data)=>{
                if (error) {
                    console.log("😥 " + error.message);
                } else {
                   // setMessage(data.returnValues[1]);
                    console.log("🎉 Your message has been updated!");
                    await loadTrees()
                    await loadActiveAccountTrees()
                }
            })
            contract.events.TreeRequested({}, async(error, data)=>{
                if (error) {
                    console.log("😥 " + error.message);
                } else {
                    // setMessage(data.returnValues[1]);
                    console.log("🎉 Your message has been updated!");
                    await loadTrees()
                    await loadActiveAccountTrees()
                }
            })
            contract.events.BoughtTreeOnSale({}, async(error, data)=>{
                if (error) {
                    console.log("😥 " + error.message);
                } else {
                    // setMessage(data.returnValues[1]);
                    console.log("🎉 Your message has been updated!");
                    await loadTrees()
                    await loadActiveAccountTrees()
                }
            })
            contract.events.SaleEnded({}, async(error, data)=>{
                if (error) {
                    console.log("😥 " + error.message);
                } else {
                    // setMessage(data.returnValues[1]);
                    console.log("🎉 Your message has been updated!");
                    await loadTrees()
                    await loadActiveAccountTrees()
                }
            })
            contract.events.TreePutOnSale({}, async(error, data)=>{
                if (error) {
                    console.log("😥 " + error.message);
                } else {
                    // setMessage(data.returnValues[1]);
                    console.log("🎉 Your message has been updated!");
                    await loadTrees()
                    await loadActiveAccountTrees()
                }
            })
        }
    }
    const loadActiveAccountTrees = async () => {
        console.log("load my trees and balance", contract, account)
        if(contract && account!==undefined && account!== "" && account!=="0x0"){
            console.log("load my trees and balance", contract, account)
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
            // console.log("[[[ ", accountsTrees)
            // let newAcctrees = []
            // treesOnSale.forEach((tree, index) =>{
            //     if(tree.tree.owner.toLowerCase() == account && tree.tree.active){
            //         console.log("wchodzi",tree.tree.owner.toLowerCase() == account, account, accountsTrees)
            //          treesTab.forEach(t => {
            //              console.log(t.id, tree.tree.TreeId, "dfd")
            //             if( t.id == tree.tree.TreeId) {
            //                 console.log("jest")
            //                 t.saleId = index
            //                 console.log(t)
            //                 newAcctrees.push(t)
            //             }
            //             else {
            //                 t.saleId = null
            //                 newAcctrees.push(t)
            //             }
            //         })
            //     }
            // })
            // console.log(newAcctrees, "[[[[[[[[[[[[")
            // setAccountsTrees(newAcctrees)

        }


    }

    useEffect(()=>{
        loadAccountsTreesOnSale()
    },[accountsTrees])

    const loadAccountsTreesOnSale = () => {
        // let newAcctrees = []
        // treesOnSale.forEach((tree, index) =>{
        //     if(tree.tree.owner.toLowerCase() == account && tree.tree.active){
        //         console.log("wchodzi",tree.tree.owner.toLowerCase() == account, account, accountsTrees)
        //          accountsTrees.forEach(t => {
        //              console.log(t.id, tree.tree.TreeId, "dfd")
        //             if( t.id == tree.tree.TreeId) {
        //                 console.log("jest")
        //                 t.saleId = index
        //                 console.log(t)
        //                 newAcctrees.push(t)
        //             }
        //             else {
        //                 t.saleId = null
        //                 newAcctrees.push(t)
        //             }
        //         })
        //     }
        // })
        // console.log(newAcctrees, "[[[[[[[[[[[[")
        // //setAccountsTrees(newAcctrees)
    }



    const loadBlockChainData = async() => {
        console.log("load blockchaindata", account)
        //const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545"
        if(web3===undefined || networkData===undefined) return 0;
        // const networkId = await web3.eth.net.getId()
        // const networkData = HelloWorld.networks[networkId]

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
            // web3.eth.subscribe('newBlockHeaders' , ()=>{
            //     console.log("looolll")
            // });
            await loadTrees()

        }
    }
    const loadTrees = async() =>{
        console.log("load trees", contract, account)
        if(contract== undefined) return 0
        console.log("load trees")
        //load totalSupply
        const totalSupply = await contract.methods.totalSupply().call()
        setTotalSupply(totalSupply)
        console.log("toteal supply", totalSupply)

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

        //load account's trees
        console.log(account, "looooooooooll")
        if(account!== undefined && account!== "" && account!=="0x"){
             console.log("dfgvmfdkgjdkic")
            await loadActiveAccountTrees()
        }

        //load trees on sale
        let treesTabOnSale = []
        try{
            for(var i = 0; i<=totalSupply; i++){
                let tree = await contract.methods.sales(i).call()
                if(tree.active){
                    let treeObj = {"id":i, "tree":tree}
                    console.log(treeObj, tree, "ONSALE", totalSupply)
                    treesTabOnSale.push(treeObj)
                }
            }
        }
        catch {
            console.log("koniec drzew on sale")
        }
        finally {
            setTreesOnSale([...treesTabOnSale])
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

    const endSale = async (tokenIdOnSale) => {
        console.log("END SALE", tokenIdOnSale)
        if(account!="" && account!= undefined && tokenIdOnSale!==undefined && tokenIdOnSale!==null){
            console.log("END SALE")
            await contract.methods.endSale(tokenIdOnSale).send({ from: account})
                .once('receipt', async(receipt) => {
                    console.log("put on sale")

                    await loadWeb3()
                    //await loadBlockChainData()
                })
            // await loadBlockChainData()
            // console.log(totalSupply, "total supply po")
        }
    }

    const buyTreeFromSale = async (tokenId, price) => {
        console.log("BUY FROM SALE", tokenId)
        if(account!="" && account!= undefined && tokenId!==undefined && tokenId!==null && price!==undefined && price!=null){
            await contract.methods.buyTree(tokenId).send({ from: account, value: String(price)})
                .once('receipt', async(receipt) => {
                    console.log("put on sale")

                    await loadWeb3()

                    await contract.methods.withdraw().send({ from: account})
                        .once('receipt', async(receipt) => {
                            console.log("withdraw")

                            await loadWeb3()

                            //await loadBlockChainData()
                        })
                    // await loadBlockChainData()
                    // console.log(totalSupply, "total supply po")
                })


        }
    }



  return (
      <Router>
          <div className='App'>
              <WalletCard account={account}
                          setAccount={setAccount}
                          loadWeb3={loadWeb3}
                          loadBlockChainData={async()=>{await loadBlockChainData()}}></WalletCard>
              <Nav />
              <RouterSwitch contract={contract}
                            account={account}
                            trees={trees}
                            mint={mint}
                            totalSupply={totalSupply}
                            accountsTrees={accountsTrees}
                            accountBalance={accountBalance}
                            putOnSale={putOnSale}
                            treesOnSale={treesOnSale}
                            buyTreeFromSale={buyTreeFromSale}
                            endSale={endSale}/>

          </div>

      </Router>

  )
}

export default App
