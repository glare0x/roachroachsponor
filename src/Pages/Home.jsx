import { useEffect, useState, Fragment } from 'react'
import { ethers } from 'ethers';
import data from "../components/Chat/data.json";
import bets from "../components/BetSection/bets.js";
import ChatCard from "../components/Chat/ChatCard";
import Button from "../assets/Button";
import BetCard from "../components/BetSection/BetCard";
import CountDown from "../components/useCountDown";
import AskBet from "../components/BetSection/AskBet";
import {useRoachStore } from "../store.js";
import "./style.css";
const ROACH_CONTRACT = "0x02286a7e39a79b81e9b35e63772dd50368d16ef9";
import { 
  getCurrentRoundNumber , 
  getRoundData,
  sponsorRoach 
} from "../utils/roachUtils";



export default function Home({connected}) {
  const [isBetInputOpen, setBetInputIsOpen] = useState(false);
  const [betRoach, setBetRoach] = useState(0);
  const [roachID, setRoachID] = useState(0);
  const [betAmount, setBetAmount] = useState(0.01);
  const [roundNumber, setRoundNumber] = useState(0);
  const [roachTotals, setRoachTotals] = useState({});
  const [roachParticipants, setRoachParticipants] = useState({});
  const roaches = useRoachStore((state) => state.roaches);


  useEffect(() => {
    if (connected) {
      getCurrentRoundNumber().then((result) => {
        setRoundNumber(result);
        
      }) 
    }
  }, [connected]);
  useEffect(() => {
    
    if (roundNumber > 0) {
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

  const closeAskBetDialog = () => {
    setBetInputIsOpen(false)
  }

  const onBet = (amount) => {
    sponsorRoach(roachID, amount).then((res) => {
      debugger
    }).catch(err => {
      debugger
      alert(err.reason)
    })

  }
  return (
    <>
      <AskBet open={isBetInputOpen} close={closeAskBetDialog} onBet={onBet}/>
      <div className="mainContent">
        <div className="container">
          <div className="cardmainwrap">

          <div className="heroVideo">
        <iframe
          title="YouTube Video"
          width="100%"
          height="600px"
          src="https://www.youtube.com/embed/uXWycyeTeCs"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          autoPlay
          controls
        ></iframe>
      </div>
      <div className="w-3/4 mx-auto block mt-4">
      <h2 className="text-2xl text-center">Round number #{ roundNumber }</h2>
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
          <div className="chatwrap">
            <div className="chat">
              <ul className="activeSessions">
                {data.map((chat) => (
                  <li key={chat.id}>
                    <ChatCard data={chat} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="sendMessage">
              <input type="text" placeholder="Enter Your Message Here" />
              <div className="btn">
                <p>172 online</p>
                <Button text={"Send"} clickFunction={() => console.log("Send Button Clicked")} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
