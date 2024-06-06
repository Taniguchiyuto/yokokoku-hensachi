import React, { useState } from "react";
import "./File1.css";
import Modal from "./components/Modal";

const File1 = () => {
  const [inputScore, setInputScore] = useState(""); // 入力されたスコアを管理する状態
  const [deviation, setDeviation] = useState(null); // 偏差値を管理する状態
  const [modalStates, setModalStates] = useState([false, false]); // 各モーダルの状態を管理

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

  const handleInputChange = (event) => {
    setInputScore(event.target.value); // 入力されたスコアを更新
  };

  const calculateDeviation = () => {
    const score = parseInt(inputScore, 10);
    const calculatedDeviation = ((score - 582) / 54.4) * 10 + 50;
    setDeviation(calculatedDeviation);
  };

  const [inputScore2, setInputScore2] = useState("");
  const [deviation2, setDeviation2] = useState(null);

  const handleInputChange2 = (event) => {
    setInputScore2(event.target.value);
  };

  const calculateDeviation2 = () => {
    const score = parseInt(inputScore2, 10);
    const calculatedDeviation = ((score - 295.76) / 26.3) * 10 + 50;
    setDeviation2(calculatedDeviation);
  };

  const lessonList = [
    {
      name: "[前期]経営学部の配点",
      introduction:
        "前期日程では大学入学共通テストの合計点と個別学力検査の合計点をそれぞれ偏差値に換算し、２対１の比率で合計します。大学入学共通テストの偏差値は、個別学力検査受験者全体のものとします。",
    },
    {
      name: "[後期]経営学部の配点",
      introduction:
        "後期日程では大学入学共通テストと個別学力検査等の成績を１対１の比率に換算します。",
    },
  ];

  return (
    <div className="file2">
      <div className="yokokoku">
        <h2>[前期]経営学部の偏差値を計算する</h2>
        <input
          type="text"
          value={inputScore}
          onChange={handleInputChange}
          placeholder="スコアを入力してください"
        />
        <button onClick={calculateDeviation}>偏差値を計算する</button>
        {deviation !== null && <p>あなたの偏差値は {deviation} です。</p>}
        <p>経営学部は800点満点で計算されます。</p>
        <button onClick={() => openModal(0)}>経営学部の配点</button>
        <Modal
          name={lessonList[0].name}
          introduction={lessonList[0].introduction}
          isOpen={modalStates[0]}
          closeModal={() => closeModal(0)}
        />
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="yokokoku">
        <h2>[後期]経営学部の偏差値を計算する</h2>
        <input
          type="text"
          value={inputScore2}
          onChange={handleInputChange2}
          placeholder="スコアを入力してください"
        />
        <button onClick={calculateDeviation2}>偏差値を計算する</button>
        {deviation2 !== null && <p>あなたの偏差値は {deviation2} です。</p>}
        <p>後期経営学部は400点満点で計算されます。</p>
        <button onClick={() => openModal(1)}>経営学部の配点</button>
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

export default File1;
