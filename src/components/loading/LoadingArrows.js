import "./Loading.css";
import React from "react";

function LoadingArrows() {
  // inspiration from https://tobiasahlin.com/spinkit/
  return (
    <div className="LoadingArrows">
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  );
}
export default LoadingArrows;
