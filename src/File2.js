import React, { useState } from "react";
import "./File2.css";

const File2 = () => {
  const [inputScore, setInputScore] = useState(""); // 入力されたスコアを管理する状態
  const [deviation, setDeviation] = useState(null); // 偏差値を管理する状態

  // スコアの入力が変更されたときの処理
  const handleInputChange = (event) => {
    setInputScore(event.target.value); // 入力されたスコアを更新
  };

  // 偏差値を計算する関数
  const calculateDeviation = () => {
    // 入力されたスコアを数値に変換
    const score = parseInt(inputScore, 10);

    // 偏差値を計算する（ここでは単純にスコアから10を引いた値を偏差値としています）
    const calculatedDeviation = ((score - 638.97) / 44.77) * 10 + 50;

    // 計算された偏差値を設定
    setDeviation(calculatedDeviation);
  };

  const [inputScore2, setInputScore2] = useState(""); // 二つ目の入力されたスコアを管理する状態
  const [deviation2, setDeviation2] = useState(null); // 二つ目の偏差値を管理する状態

  // 二つ目のスコアの入力が変更されたときの処理
  const handleInputChange2 = (event) => {
    setInputScore2(event.target.value); // 入力されたスコアを更新
  };

  // 二つ目の偏差値を計算する関数
  const calculateDeviation2 = () => {
    // 入力されたスコアを数値に変換
    const score = parseInt(inputScore2, 10);

    // 二つ目の偏差値を計算する（ここでは単純にスコアから20を引いた値を偏差値としています）
    const calculatedDeviation = ((score - 590.83) / 47.7) * 10 + 50;

    // 計算された偏差値を設定
    setDeviation2(calculatedDeviation);
  };

  return (
    <div className="file2">
      <div className="yokokoku">
        <h2>[前期]経済学部の偏差値を計算する</h2>
        <input
          type="text"
          value={inputScore}
          onChange={handleInputChange}
          placeholder="スコアを入力してください"
        />
        <button onClick={calculateDeviation}>偏差値を計算する</button>
        {deviation !== null && <p>あなたの偏差値は {deviation} です。</p>}
        <p>経済学部は900点満点で計算されます。</p>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="yokokoku">
        <h2>[後期]経済学部の偏差値を計算する</h2>
        <input
          type="text"
          value={inputScore2}
          onChange={handleInputChange2}
          placeholder="スコアを入力してください"
        />
        <button onClick={calculateDeviation2}>偏差値を計算する</button>
        {deviation2 !== null && <p>あなたの偏差値は {deviation2} です。</p>}
        <p>経済学部後期は800点満点で計算されます。</p>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default File2;
