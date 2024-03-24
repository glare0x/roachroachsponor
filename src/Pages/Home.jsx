import { useEffect, useState, Fragment } from 'react'
import { ethers } from 'ethers';
import data from "../components/Chat/data.json";
import bets from "../components/BetSection/bets.js";
import ChatCard from "../components/Chat/ChatCard";
import Button from "../assets/Button";
import BetCard from "../components/BetSection/BetCard";
import CountDown from "../components/useCountDown";
import AskSponsor from "../components/BetSection/AskSponsor";
import RoundEndDialog from "../components/RoundEndDialog";
import contractABI from  '../utils/roachABI.json';
import {useRoachStore } from "../store.js";
import "./style.css";
const ROACH_CONTRACT = import.meta.env.VITE_ROACH_CONTRACT;

import { 
  getCurrentRoundNumber , 
  getRoundData,
  sponsorRoach ,
  simulateRewards,
} from "../utils/roachUtils";



export default function Home({connected}) {
  const [isBetInputOpen, setBetInputIsOpen] = useState(false);
  const [betRoach, setBetRoach] = useState(0);
  const [roachID, setRoachID] = useState(0);
  const [betAmount, setBetAmount] = useState(0.01);
  const [roundNumber, setRoundNumber] = useState(0);
  const [roachTotals, setRoachTotals] = useState({});
  const [roachParticipants, setRoachParticipants] = useState({});
  const [roundEndData, setRoundEndData] = useState(null);
  const [showRoundEndDialog, setShowRoundEndDialog] = useState(false);
  const [askBetBusy, setAskSponsorBusy] = useState(false);
  const [simulatedRewards, setSimulatedRewards] = useState(null);
  const roaches = useRoachStore((state) => state.roaches);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ROACH_CONTRACT, contractABI, signer);

    contract.on("NewSponsor", (addr, roach, round, amount, event) => {

        console.log(`New Sponsor Detected`);
        // Just get the new round data, don't try to merge or anything fancy.
      getRoundData(roundNumber).then((res) => {
        setRoachTotals({
          "1": ethers.utils.formatEther(res.roach1Total.toString()),
          "2": ethers.utils.formatEther(res.roach2Total.toString()),
          "3": ethers.utils.formatEther(res.roach3Total.toString()),
          "4": ethers.utils.formatEther(res.roach4Total.toString()),
        })
        setRoachParticipants({
          "1": res.roach1Participants.toString(),
          "2": res.roach2Participants.toString(),
          "3": res.roach3Participants.toString(),
          "4": res.roach4Participants.toString()
        })
      })
      });
    contract.on("RoundEnd", (roundNumber, winnerRoach, totalWinnerSponsors, totalLoserSponsors, numberOfWinners, numberOfLosers) => {
        debugger
        console.log(`Round End Detected: `);
        // Additional logic to handle the event
        setRoundEndData({
          roundNumber,
          winnerRoach : winnerRoach.toString(),
          totalWinnerSponsors : ethers.utils.formatEther(totalWinnerSponsors.toString()),
          totalLoserSponsors : ethers.utils.formatEther(totalLoserSponsors.toString()),
          numberOfWinners : numberOfWinners.toString(),
          numberOfLosers : numberOfLosers.toString(),
        });
        setShowRoundEndDialog(true);
      });


  useEffect(() => {
    if (connected) {
      getCurrentRoundNumber().then((result) => {
        setRoundNumber(result);
      }) 
    }
  }, [connected]);
  useEffect(() => {
    
    if (roundNumber > 0) {
      /*
      simulateRewards(2).then((res) => {
        debugger
        console.log("Simulated Rewards",res)
        setSimulatedRewards({
          sponsored : ethers.utils.formatEther(res.amountSponsored.toString()),
          reward : ethers.utils.formatEther(res.reward.toString())
        })
      })
      */
      getRoundData(roundNumber).then((res) => {
        setRoachTotals({
          "1": ethers.utils.formatEther(res.roach1Total.toString()),
          "2": ethers.utils.formatEther(res.roach2Total.toString()),
          "3": ethers.utils.formatEther(res.roach3Total.toString()),
          "4": ethers.utils.formatEther(res.roach4Total.toString()),
        })
        setRoachParticipants({
          "1": res.roach1Participants.toString(),
          "2": res.roach2Participants.toString(),
          "3": res.roach3Participants.toString(),
          "4": res.roach4Participants.toString()
        })
      })
    }

  },[roundNumber])
  const openBetDialog = (event, id) => {
    setRoachID(id);
    setBetInputIsOpen(true);
  };

const closeRoundEndDialog = () => {
  setShowRoundEndDialog(false)
}
const closeAskSponsorDialog = () => {
  setBetInputIsOpen(false)
}

const onBet = (amount) => {
  setAskSponsorBusy(true);
  sponsorRoach(roachID, amount).then((res) => {
    setAskSponsorBusy(false);
    setBetInputIsOpen(false)
    alert("Your bet has been placed!")
  }).catch(err => {
    setAskSponsorBusy(false);
    debugger
    alert(err.reason)
  })
}

return (
  <>
    <RoundEndDialog open={showRoundEndDialog} close={closeRoundEndDialog} winner={roundEndData} />
    <AskSponsor open={isBetInputOpen} close={closeAskSponsorDialog} onBet={onBet} busy={askBetBusy} roach={roachID} />
    <div className="mainContent">
      <div className="container">
        <div className="cardmainwrap">

          <div className="heroVideo">
        <iframe
                src="https://player.twitch.tv/?channel=bobross&parent=localhost"
                height="600"
                width="100%"
                allowFullScreen={true}>
              </iframe>
      </div>
          <div className="w-3/4 mx-auto block mt-4">
            <h2 className="text-2xl text-center">Round number #{roundNumber}</h2>
              <div className="text-center">
                {simulatedRewards != null && (
                  <div>
                    Your sponsor: {simulatedRewards.sponsored}<br />
                    Possible reward: {simulatedRewards.reward}
                  </div>
                )
                }
              </div>
            </div>

            <CountDown
              time={{ hrs: 4, min: 20, sec: 40 }}
              text={"Sponsor Now, Race Starts in"}
            />
            <div className="cards">
              {bets.map((bet) => (
                <BetCard key={bet.name} data={bet} total={roachTotals[bet.id]} participants={roachParticipants[bet.id]} addBet={openBetDialog} />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </>
  )
}
