import Web3 from 'web3';
import contractABI from  './roachABI.json';
import roachTokenABI from  './roachTokenABI.json';
import { ethers } from 'ethers';
import {useRoachStore } from "../store.js";



const ROACH_CONTRACT = import.meta.env.VITE_ROACH_CONTRACT;
const ROACH_TOKEN_CONTRACT = import.meta.env.VITE_ROACH_TOKEN_CONTRACT;
// Import the necessary dependencies
async function simulateRewards(roach) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    console.log("account",account)
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ROACH_CONTRACT, contractABI, signer);
    const simulateRewards = await contract.simulateRewards(roach, account);
    return simulateRewards;
}

// Create a function to get the current round number
async function getCurrentRoundNumber() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ROACH_CONTRACT, contractABI, signer);
    const roundNumber = await contract.getCurrentRoundNumber();
    return roundNumber;
}
async function getRoundData(roundNumber) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ROACH_CONTRACT, contractABI, signer);
    const roundData = await contract.getRoundData(roundNumber);
    return roundData;
}
async function sponsorRoach(roachId, amount) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    debugger
    // First, add allowance for the contract to spend the token
    const roachContract = new ethers.Contract(ROACH_TOKEN_CONTRACT, roachTokenABI, signer);
    const allowance = await roachContract.allowance(signer.getAddress(), ROACH_CONTRACT);
    // Convert the amount to wei
    amount = ethers.utils.parseEther(amount.toString());
    console.log("Roach token contract",ROACH_TOKEN_CONTRACT)
    if (allowance < amount) {
        const approveTx = await roachContract.approve(ROACH_CONTRACT, amount);
        await approveTx.wait();
    }

    const contract = new ethers.Contract(ROACH_CONTRACT, contractABI, signer);
    console.log("Race contract",ROACH_CONTRACT)
    const ret = await contract.sponsorRoach(roachId, amount);
    return ret;

}

// Export the function
export { 
    getCurrentRoundNumber ,
    sponsorRoach,
    getRoundData,
    simulateRewards,
};