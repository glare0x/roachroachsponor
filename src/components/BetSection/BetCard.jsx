import BetData from "./BetData";
// import { Hamster } from "../../assets/Images";
export default function ({ data }) {
  const { name, betsData, link, Img } = data;
  console.log(Img);
  return (
    <div>
      <h2>{name}</h2>
      <Img />
      <a href={link}>Place</a>
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
