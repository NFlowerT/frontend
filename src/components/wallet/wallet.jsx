import React, {useState, useEffect} from 'react'

const WalletCard = ({ account, setAccount,loadWeb3, loadBlockChainData, accountFounds, receiveFunds }) => {

    const [errorMessage, setErrorMessage] = useState(null);
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');

    useEffect(() => {
        if(window.ethereum && window.ethereum.isMetaMask){
            console.log("wallet")
            window.ethereum.on('accountsChanged',  connectAutoWalletHandler);
            window.ethereum.on('chainChanged', loadBlockChainData);
        }
    }, []);

    //when user change account in MetaMask wallet
    const connectAutoWalletHandler = (account) => {
        console.log("connectAutoWalletHandler")
        setAccount(account[0].toLowerCase())
    }

    //when user click connection button
    const connectWalletHandler = async() => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            await window.ethereum.request({ method: 'eth_requestAccounts'})
                .then(async result => {
                    setAccount(result[0]);
                    setConnButtonText('Wallet Connected');
                    // await loadWeb3()
                })
                .catch(error => {
                    setErrorMessage(error.message);
                });
        } else {
            setErrorMessage('Please install MetaMask browser extension to interact');
        }

    }



    return (
        <div className='walletCard'>
            <button onClick={connectWalletHandler}>{connButtonText}</button>
            <div className='accountDisplay'>
                <h3>Address: {account}</h3>
            </div>
            <div className='balanceDisplay'>
            </div>
            founds: {accountFounds} <button onClick={receiveFunds}>recieve founds</button>
            {errorMessage}
        </div>
    );
}

export default WalletCard;
