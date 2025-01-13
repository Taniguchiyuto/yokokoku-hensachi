// navigation.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./navigation.css";

const Navigation = () => {
  const navigate = useNavigate(); //ルーティング用

  const handleScoreCalculationNavigation = (e) => {
    e.preventDefault(); //デフォルトのリロード動作をキャンセル
    navigate("/calculate-score"); //Caluculate Scoreページに遷移
  };

  return (
    <div className="navigation">
      <a>2024年度版</a>
      <a className="hide-on-small">2025年度版はこちら</a>
      <a
        href="https://www.ynu.ac.jp/exam/faculty/enforce/pdf/R5_01-3.pdf"
        className="hide-on-small"
      >
        2023年度得点開示
      </a>
      {/* <button> */}
      <a onClick={handleScoreCalculationNavigation}>偏差値計算</a>
      {/* </button> */}
    </div>
  );
};

export default Navigation;
