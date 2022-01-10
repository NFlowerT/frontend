import React, {useState} from 'react'

const WalletCard = ({ account, setAccount }) => {

    const [errorMessage, setErrorMessage] = useState(null);
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');

    const connectWalletHandler = async() => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            console.log('MetaMask Here!');

            await window.ethereum.request({ method: 'eth_requestAccounts'})
                .then(result => {
                    setAccount(result[0]);
                    console.log("connected to ", account)
                    setConnButtonText('Wallet Connected');
                    // getAccountBalance(result[0]);
                })
                .catch(error => {
                    setErrorMessage(error.message);

                });

        } else {
            console.log('Need to install MetaMask');
            setErrorMessage('Please install MetaMask browser extension to interact');
        }
    }

    // update account, will cause component re-render
    // const accountChangedHandler = (newAccount) => {
    //     setAccount(newAccount);
    //     console.log("wallet ustawienie allount na ", account)
    //     // getAccountBalance(newAccount.toString());
    // }

    const chainChangedHandler = () => {
        // reload the page to avoid any errors with chain change mid use of application
        window.location.reload();
    }

    // listen for account changes
    window.ethereum.on('accountsChanged',  connectWalletHandler);

    return (
        <div className='walletCard'>
            <button onClick={connectWalletHandler}>{connButtonText}</button>
            <div className='accountDisplay'>
                <h3>Address: {account}</h3>
            </div>
            <div className='balanceDisplay'>
            {/*<h3>Balance: {userBalance}</h3>*/}
            </div>
            {errorMessage}
        </div>
    );
}

export default WalletCard;
