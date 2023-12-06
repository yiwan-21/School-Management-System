import React from "react";
import "./DashboardCard.css";
import Counter from "./Counter";

const DashboardCard = ({ route }) => {
  return (
    <div className="card1 font-bold shadow-lg hover:scale-105 transition-all duration-200 ease-in">
      <h1>{route.title}</h1>
      {/* <p className="font-bold">{route.number}</p> */}
      <div className="icon" style={{ fontSize: "60px" }}>
        {route.icon}
      </div>
    </div>
  );
};

export default DashboardCard;
