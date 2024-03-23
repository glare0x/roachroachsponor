import { useState, Fragment } from 'react'
import data from "../components/Chat/data.json";
import bets from "../components/BetSection/bets.js";
import ChatCard from "../components/Chat/ChatCard";
import Button from "../assets/Button";
import BetCard from "../components/BetSection/BetCard";
import CountDown from "../components/useCountDown";
import AskBet from "../components/BetSection/AskBet";
import "./style.css";



export default function Home() {
  const [isBetInputOpen, setBetInputIsOpen] = useState(false);
  const openBetDialog = (event, id) => {
    setBetInputIsOpen(true)
  }
  const closeAskBetDialog = () => {
    setBetInputIsOpen(false)
  }
  return (
    <>
      <AskBet open={isBetInputOpen} close={closeAskBetDialog} />
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
            <CountDown
              time={{ hrs: 4, min: 20, sec: 40 }}
              text={"Sponsor now, Race Starts in"}
            />
            <div className="cards">
              {bets.map((bet) => {
                return <BetCard key={bet.name} data={bet} addBet={openBetDialog} />;
              })}
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
                <Button
                  text={"Send"}
                  clickFunction={() => console.log("Send Button Clicked")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
