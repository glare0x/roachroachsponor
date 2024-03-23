import React, { useState, useEffect } from "react";
import user from "../../assets/Images/user.svg";
import { Logo } from "../../assets/Images";
import { Dialog } from '@headlessui/react'
import "./header.css";

export default function Header() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const BASE_MAINNET_ID = '8453';

  useEffect(() => {
    const checkWalletConnectionAndNetwork = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          const networkId = await window.ethereum.request({ method: 'net_version' });
          if (accounts.length > 0 && networkId === BASE_MAINNET_ID) {
            setIsWalletConnected(true); // Wallet is connected and on the correct network
          } else if (networkId !== BASE_MAINNET_ID) {
            switchToBaseMainnet(); // Attempt to switch if not on Base mainnet
          }
        } catch (error) {
          console.error('Error checking wallet connection and network:', error);
        }
      }
    };

    const switchToBaseMainnet = async () => {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${parseInt(BASE_MAINNET_ID, 10).toString(16)}` }],
        });
      } catch (error) {
        if (error.code === 4902) {
          console.error('Base mainnet not configured in MetaMask:', error);
        } else {
          console.error('Error switching to the Base mainnet:', error);
        }
      }
    };

    checkWalletConnectionAndNetwork();
  }, []);

  const connectWalletHandler = async (e) => {
    e.preventDefault();
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const networkId = await window.ethereum.request({ method: 'net_version' });
        if (accounts.length > 0 && networkId === BASE_MAINNET_ID) {
          setIsWalletConnected(true);
        } else if (networkId !== BASE_MAINNET_ID) {
          await switchToBaseMainnet();
        }
      } catch (error) {
        console.error('Error connecting to the wallet:', error);
      }
    } else {
      alert('MetaMask is not installed.');
    }
  };

  return (
    <>
      <div className="hMain">
        <div className="container">
          <div className="hIcon">
            <a href="/"><Logo /></a>
          </div>
          <div className="singIn">
            <a href="/" onClick={connectWalletHandler} className="walletConnectButton">
              {isWalletConnected ? 'Wallet Connected' : 'Connect Wallet'} <img src={user} alt="Wallet Icon" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
