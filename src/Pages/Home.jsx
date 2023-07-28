import data from "../components/Chat/data.json";
import bets from "../components/BetSection/bets.js";
import ChatCard from "../components/Chat/ChatCard";
import Button from "../assets/Button";
import BetCard from "../components/BetSection/BetCard";
import CountDown from "../components/useCountDown";
import "./style.css";

export default function Home() {
  return (
    <>
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
      {/* <section className="chat">
        <ul className="activeSessions">
          {data.map((chat) => (
            <li>
              <ChatCard key={chat.id} data={chat} />
            </li>
          ))}
        </ul>
        <div className="sendMessage">
        <input type="text" placeholder="Enter Your Message Here" />
        <p>172 online</p>
        <Button
        text={"Send"}
        clickFunction={() => console.log("Send Button Clicked")}
        />
        </div>
      </section> */}

      <div className="mainContent">
        <div className="container">
          <div className="cardmainwrap">
            <CountDown
              time={{ hrs: 0, min: 0, sec: 40 }}
              text={"Place Your Bets, Race Starts in"}
            />
            <div className="cards">
              {bets.map((bet) => {
                return <BetCard key={bet.name} data={bet} />;
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
