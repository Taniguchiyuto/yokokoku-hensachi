import React, { useState } from "react";
import "./File2.css";
import Modal from "./components/Modal";

const File2 = () => {
  const [inputScore, setInputScore] = useState(""); // 入力されたスコアを管理する状態
  const [deviation, setDeviation] = useState(null); // 偏差値を管理する状態
  const [modalStates, setModalStates] = useState([false, false]); // 各モーダルの状態を管理

  // スコアの入力が変更されたときの処理
  const handleInputChange = (event) => {
    setInputScore(event.target.value); // 入力されたスコアを更新
  };

  const openModal = (index) => {
    const newModalStates = [...modalStates];
    newModalStates[index] = true;
    setModalStates(newModalStates);
  };

  const closeModal = (index) => {
    const newModalStates = [...modalStates];
    newModalStates[index] = false;
    setModalStates(newModalStates);
    console.log(`Modal closed at index: ${index}`);
  };

  // 偏差値を計算する関数
  const calculateDeviation = () => {
    // 入力されたスコアを数値に変換
    const score = parseInt(inputScore, 10);

    // 偏差値を計算する（ここでは単純にスコアから10を引いた値を偏差値としています）
    const calculatedDeviation = ((score - 634) / 60.17) * 10 + 50;

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
    const calculatedDeviation = ((score - 571) / 79.41) * 10 + 50;

    // 計算された偏差値を設定
    setDeviation2(calculatedDeviation);
  };

  const lessonList = [
    {
      name: "[前期]経済学部の配点",
      introduction:
        "大学入学共通テストの合計点と個別学力検査の合計点をそれぞれ偏差値に換算し、一対一の比率で合計します。大学入学共通テストの偏差値は、個別学力検査受験全体の物とします。",
    },
    {
      name: "[後期]経済学部の配点",
      introduction:
        "大学入学共通テストの合計点と個別学力検査の合計点をそれぞれ偏差値に換算し、一対一の比率で合計します。大学入学共通テストの偏差値は、個別学力検査受験全体の物とします。",
    },
  ];

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
        <button onClick={() => openModal(0)}>前期経済学部の配点</button>
      </div>
      <Modal
        name={lessonList[0].name}
        introduction={lessonList[0].introduction}
        isOpen={modalStates[0]}
        closeModal={() => closeModal(0)}
      />
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
        <button onClick={() => openModal(1)}>後期経済学部の配点</button>
        <Modal
          name={lessonList[1].name}
          introduction={lessonList[1].introduction}
          isOpen={modalStates[1]}
          closeModal={() => closeModal(1)}
        />
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default File2;
