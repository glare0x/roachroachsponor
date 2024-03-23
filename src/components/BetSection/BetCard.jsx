import BetData from "./BetData";
// import { Hamster } from "../../assets/Images";
export default function ({ data ,addBet }) {
  const { name, betsData, link, Img } = data;
  return (
    <div>
      <h2>{name}</h2>
      <Img />
      <button onClick={() => addBet(this,data.id)}>Sponsor</button>
      <div className="cardslistWrap">
        <div className="card-list">
          {betsData?.map((row) => {
            return <BetData key={row.house} data={row} />;
          })}
        </div>
      </div>
    </div>
  );
}
