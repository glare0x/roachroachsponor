import React from "react";
import { BUSD } from "../../assets/Images";

export default function BetData({ data }) {
  const { house, amount, ratio } = data;
  return (
    <div>
      <div>
        <span>{house}</span>
      </div>
      <div>
        <span>
          {" "}
          {amount} BUSD{" "}
          <BUSD styles={{ height: "10px", width: "10px", color: "red" }} />
        </span>
      </div>
      <div style={{ color: "rgb(69, 228, 174) " }}>
        {" "}
        <span>{ratio}</span>
      </div>
    </div>
  );
}
