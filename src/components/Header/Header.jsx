import React from "react";
import  user  from "../../assets/Images/user.svg";
import  Logo  from "../../assets/Images/logo.png";
import "./header.css";

export default function () {
  return (
    <>
      <div className="hMain">
        <div className="container">
            <div className="hIcon">
              <a href="/"><img src={Logo} alt="" /></a>
            </div>
            <div className="singIn">
              <a href=''>SIGN IN <img src={user} alt="" /></a>
            </div>
        </div>
      </div>
    </>
  );
}
