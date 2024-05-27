import React from "react";
import "./Main.css";
import File1 from "../File1"; // パスを修正
import File2 from "../File2";

const Main = () => {
  return (
    <div className="main">
      <File1 />
      <File2 />
    </div>
  );
};

export default Main;
