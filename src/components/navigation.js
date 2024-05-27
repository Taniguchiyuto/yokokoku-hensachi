// navigation.js
import React from "react";
import "./navigation.css";

const Navigation = () => {
  return (
    <div className="navigation">
      <a href="#home">2024年度版</a>
      <a href="#about" className="hide-on-small">
        2025年度版はこちら
      </a>
      <a
        href="https://www.ynu.ac.jp/exam/faculty/enforce/pdf/R5_01-3.pdf"
        className="hide-on-small"
      >
        2023年度得点開示
      </a>
      <a href="https://dn-sundai.benesse.ne.jp/dn/center/doukou/daigaku/1190/index.html">
        参照ページ
      </a>
    </div>
  );
};

export default Navigation;
