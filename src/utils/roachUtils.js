import Web3 from 'web3';
import contractABI from  './roachABI.json';
import { ethers } from 'ethers';


const ROACH_CONTRACT = import.meta.env.VITE_ROACH_CONTRACT;
// Import the necessary dependencies

// Create a function to get the current round number
async function getCurrentRoundNumber() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ROACH_CONTRACT, contractABI, signer);
    const roundNumber = await contract.getCurrentRoundNumber();
    return roundNumber;
}
async function getRoundData() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ROACH_CONTRACT, contractABI, signer);
    const roundNumber = await contract.getRoundData();
    return roundNumber;
}

// Export the function
export { 
    getCurrentRoundNumber ,
};