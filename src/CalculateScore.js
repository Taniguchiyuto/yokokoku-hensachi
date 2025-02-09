import React, { useState, useEffect } from "react";

// socialStudies1 と socialStudies2 のうち大きい方を society として保存するユーティリティ関数
function combineSocialStudies(weighting) {
  const { socialStudies1, socialStudies2, ...rest } = weighting;
  const maxSocial = Math.max(socialStudies1 || 0, socialStudies2 || 0);
  return { ...rest, society: maxSocial };
}

const CalculateScore = () => {
  const [step, setStep] = useState(1); // ステップ管理
  const [year, setYear] = useState(""); // 年度選択
  const [track, setTrack] = useState(""); // 文理選択
  const [scores, setScores] = useState({}); // 点数入力管理
  const [errors, setErrors] = useState({}); // エラー管理
  const [deviation, setDeviation] = useState({ 前期: null, 後期: null }); // 偏差値保存

  // 元の重み付け定義（socialStudies1 と socialStudies2 を含む）
  const originalWeightings = {
    経済前期: {
      japanese: 1.0,
      socialStudies1: 1.0,
      socialStudies2: 1.0,
      math1: 1.0,
      math2: 1.0,
      englishR: 1.6,
      englishL: 0.4,
      information: 1.0,
      science: 1.0,
      science1: 1.0,
      science2: 1.0,
    },
    経済後期: {
      japanese: 1.0,
      socialStudies1: 1.0,
      socialStudies2: 1.0,
      math1: 1.0,
      math2: 1.0,
      englishR: 1.6,
      englishL: 0.4,
      information: 1,
      science: 1,
      science1: 1.0,
      science2: 1.0,
    },
    経営前期: {
      japanese: 1.0,
      socialStudies1: 1.0,
      socialStudies2: 1.0,
      math1: 1.0,
      math2: 1.0,
      englishR: 1.6,
      englishL: 0.4,
      information: 1,
      science: 1,
      science1: 1.0,
      science2: 1.0,
    },
    経営後期: {
      japanese: 0.5,
      socialStudies1: 0.5,
      socialStudies2: 0.5,
      math1: 0.5,
      math2: 0.5,
      englishR: 0.8,
      englishL: 0.2,
      information: 0.5,
      science: 0.5,
    },
  };

  // combineSocialStudies 関数を用いて各期ごとの重み付けを作成
  const weightings = {
    経済前期: originalWeightings.経済前期,
    経済後期: originalWeightings.経済後期,
    経営前期: combineSocialStudies(originalWeightings.経営前期),
    経営後期: combineSocialStudies(originalWeightings.経営後期),
  };

  // 科目情報
  const subjects = {
    文系: [
      { label: "国語", name: "japanese", maxScore: 200 },
      { label: "社会1", name: "socialStudies1", maxScore: 100 },
      { label: "社会2", name: "socialStudies2", maxScore: 100 },
      { label: "数学1A", name: "math1", maxScore: 100 },
      { label: "数学2B", name: "math2", maxScore: 100 },
      { label: "英語R", name: "englishR", maxScore: 100 },
      { label: "英語L", name: "englishL", maxScore: 100 },
      { label: "情報", name: "information", maxScore: 100 },
      { label: "理科基礎", name: "science", maxScore: 100 },
    ],
    理系: [
      { label: "数学1A", name: "math1", maxScore: 100 },
      { label: "数学2B", name: "math2", maxScore: 100 },
      { label: "国語", name: "japanese", maxScore: 200 },
      { label: "社会", name: "socialStudies1", maxScore: 100 },
      { label: "理科1", name: "science1", maxScore: 100 },
      { label: "理科2", name: "science2", maxScore: 100 },
      { label: "英語R", name: "englishR", maxScore: 100 },
      { label: "英語L", name: "englishL", maxScore: 100 },
      { label: "情報", name: "information", maxScore: 100 },
    ],
  };

  // スコア計算
  // スコア計算
  const calculateTotalScore = (term) => {
    const currentWeightings = weightings[term];
    let total = 0;

    //termが特定の値の場合、社会のスコアを比較して大きい方を採用
    if (term === "経営前期" || term === "経営後期") {
      const social1 = parseInt(scores.socialStudies1, 10) || 0;
      const social2 = parseInt(scores.socialStudies2, 10) || 0;
      const sci1 = parseInt(scores.science1 || 0, 10);
      const sci2 = parseInt(scores.science2 || 0, 10);
      const maxScience = Math.max(sci1, sci2);

      const maxSocialScore = Math.max(social1, social2);
      const socialWeight = currentWeightings.society || 1;
      const ScienceWeight = currentWeightings.science || 1;
      total += maxScience * ScienceWeight;
      total += maxSocialScore * socialWeight;
      Object.entries(scores).forEach(([subject, score]) => {
        if (subject === "socialStudies1" || subject === "socialStudies2")
          return;
        if (subject === "science1" || subject === "science2") return;
        const numericScore = parseInt(score, 10) || 0;
        const weight = currentWeightings[subject] || 1;
        total += numericScore * weight;
      });

      return total;
    } else if (term === "経済後期") {
      const social1 = parseInt(scores.socialStudies1 || 0, 10);
      const social2 = parseInt(scores.socialStudies2 || 0, 10);
      const maxSocialScore = Math.max(social1, social2);

      total += maxSocialScore * 1;
      const sci1 = parseInt(scores.science1 || 0, 10);
      const sci2 = parseInt(scores.science2 || 0, 10);
      const maxScience = Math.max(sci1, sci2);
      total += maxScience * 1;
      Object.entries(scores).forEach(([subject, score]) => {
        if (subject === "socialStudies1" || subject === "socialStudies2")
          return;
        if (subject === "science1" || subject === "science2") return;
        const numericScore = parseInt(score || 0, 10);
        const weight = currentWeightings[subject] || 1;
        total += numericScore * weight;
      });
      return total;
    } else {
      Object.entries(scores).forEach(([subject, score]) => {
        const numericScore = parseInt(score, 10) || 0;
        const weight = currentWeightings[subject] || 1;
        total += numericScore * weight;
      });
      return total;
    }
  };

  // 偏差値計算
  useEffect(() => {
    console.log("合計点数を計算");
    let 経済前期 = "経済前期";
    let 経済後期 = "経済後期";

    let 経営前期 = "経営前期";
    let 経営後期 = "経営後期";

    const totalScore経済前期 = calculateTotalScore(経済前期) * 0.9;
    const totalScore経済前期2025 = calculateTotalScore(経済前期);
    const totalScore経済後期2025 = calculateTotalScore(経済後期);
    const totalScore経済後期 = calculateTotalScore(経済後期) * 0.88888888;
    const totalScore前期 = calculateTotalScore(経営前期) * 0.88888888;
    const totalScore後期 = calculateTotalScore(経営後期) * 0.88888888;
    const totalScore経営後期2025 = calculateTotalScore(経営後期);
    const totalScore経営前期2025 = calculateTotalScore(経営前期);
    console.log(totalScore前期);

    let calculatedDeviation前期,
      calculatedDeviation後期,
      calculatedDeviation経済前期,
      calculatedDeviation経済後期;

    if (year === "2023") {
      calculatedDeviation前期 = ((totalScore前期 - 582) / 54.4) * 10 + 50;
      calculatedDeviation後期 = ((totalScore後期 - 295.76) / 26.3) * 10 + 50;
      calculatedDeviation経済前期 =
        ((totalScore経済前期 - 634) / 60.17) * 10 + 50;
      calculatedDeviation経済後期 =
        ((totalScore経済後期 - 571) / 79.41) * 10 + 50;
    } else if (year === "2024") {
      calculatedDeviation前期 = ((totalScore前期 - 295.76) / 26.3) * 10 + 50;
      calculatedDeviation後期 = ((totalScore後期 - 295.76) / 26.3) * 10 + 50;
    } else if (year === "2025") {
      calculatedDeviation経済前期 =
        ((totalScore経済前期2025 - 715.86) / 68.985) * 10 + 50;
      calculatedDeviation経済後期 =
        ((totalScore経済後期2025 - 719) / 55) * 10 + 50;
      calculatedDeviation後期 =
        ((totalScore経営後期2025 - 360) / 30.603) * 10 + 50;
      calculatedDeviation前期 = ((totalScore経営前期2025 - 661) / 65) * 10 + 50;
    } else {
      calculatedDeviation前期 = null;
      calculatedDeviation後期 = null;
    }

    setDeviation({
      経済前期:
        calculatedDeviation経済前期?.toFixed(2) || "計算できませんでした",
      経済後期:
        calculatedDeviation経済後期?.toFixed(2) || "計算できませんでした",

      経営前期: calculatedDeviation前期?.toFixed(2) || "計算できませんでした",
      経営後期: calculatedDeviation後期?.toFixed(2) || "計算できませんでした",
    });
  }, [scores, year]);

  // 年度変更
  const handleYearChange = (e) => setYear(e.target.value);

  // 文理変更
  const handleTrackChange = (e) => setTrack(e.target.value);

  // 点数変更
  const handleScoreChange = (e) => {
    const { name, value } = e.target;
    const numericValue = parseInt(value, 10);

    const subject = subjects[track]?.find((s) => s.name === name);
    const maxScore = subject?.maxScore || 100;

    if (numericValue > maxScore) {
      setErrors((prev) => ({
        ...prev,
        [name]: `${subject.label}の点数は最大${maxScore}点です。`,
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    setScores((prev) => ({ ...prev, [name]: value }));
  };

  // ステップ切り替え
  const handleNext = () => {
    if (step === 1 && (!year || !track)) {
      alert("年度と文理を選択してください。");
      return;
    }
    if (step === 2 && Object.keys(errors).length > 0) {
      const totalScore前期 = calculateTotalScore("経営前期");
      const totalScore後期 = calculateTotalScore("経営後期");

      console.log("前期合計点数:", totalScore前期);
      console.log("後期合計点数:", totalScore後期);

      alert("スコアにエラーがあります。修正してください。");
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      {step === 1 && (
        <>
          <h1>① 年度・文理選択</h1>
          <div style={{ marginBottom: "20px" }}>
            <label>年度を選択</label>
            <select
              value={year}
              onChange={handleYearChange}
              style={{ width: "100%", padding: "10px", margin: "10px 0" }}
            >
              <option value="">選択してください</option>
              <option value="2023">2023</option>
              {/* <option value="2024">2024</option> */}
              <option value="2025">2025</option>
            </select>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label>文理を選択</label>
            <select
              value={track}
              onChange={handleTrackChange}
              style={{ width: "100%", padding: "10px", margin: "10px 0" }}
            >
              <option value="">選択してください</option>
              <option value="文系">文系</option>
              <option value="理系">理系</option>
            </select>
          </div>
          <button
            onClick={handleNext}
            style={{
              padding: "10px 20px",
              backgroundColor: "green",
              color: "white",
              border: "none",
              width: "100%",
            }}
          >
            次へ
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h1>② 共通テストの点数入力</h1>
          <form>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>科目</th>
                  <th>得点</th>
                </tr>
              </thead>
              <tbody>
                {subjects[track]?.map((subject) => (
                  <tr key={subject.name}>
                    <td>{subject.label}</td>
                    <td>
                      <input
                        type="number"
                        name={subject.name}
                        value={scores[subject.name] || ""}
                        onChange={handleScoreChange}
                        style={{ width: "100%", padding: "4px" }}
                      />
                    </td>
                    <td style={{ color: "red", fontSize: "12px" }}>
                      {errors[subject.name]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: "20px" }}>
              <button
                onClick={handleBack}
                type="button"
                style={{
                  marginRight: "10px",
                  padding: "10px 20px",
                  width: "48%",
                }}
              >
                戻る
              </button>
              <button
                onClick={handleNext}
                type="button"
                style={{
                  padding: "10px 20px",
                  width: "48%",
                  backgroundColor: "green",
                  color: "white",
                  border: "none",
                }}
              >
                次へ
              </button>
            </div>
          </form>
        </>
      )}

      {step === 3 && (
        <>
          <h1 style={{ textAlign: "center" }}>③ 偏差値換算結果</h1>
          <div>
            <p>選択された年度: {year}</p>
            <p>選択された文理: {track}</p>

            {/* <h2>経済偏差値(前期): {deviation.経済前期}</h2>

            <h2>経済偏差値(後期):{deviation.経済後期}</h2>
            <h2>経営偏差値 (前期): {deviation.経営前期}</h2>
            <h2>経営偏差値 (後期): {deviation.経営後期}</h2> */}

            <table>
              <thead>
                <tr>
                  <th>偏差値換算結果</th>
                  <th>二次試験での必要偏差値</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <h2>経済偏差値(前期): {deviation.経済前期}</h2>
                  </td>
                  <td>
                    <h2 style={{ textAlign: "center" }}>
                      {(107.449 - deviation.経済前期).toFixed(2)}
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h2>経済偏差値(後期):{deviation.経済後期}</h2>
                  </td>
                  <td>
                    {/* {" "} */}
                    <h2 style={{ textAlign: "center" }}>
                      {(114.423 - deviation.経済後期).toFixed(2)}
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td>
                    {/* {" "} */}
                    <h2>経営偏差値 (前期): {deviation.経営前期}</h2>
                  </td>
                  <td>
                    <h2 style={{ textAlign: "center" }}>
                      {(166.766 - 2 * deviation.経営前期).toFixed(2)}
                    </h2>
                  </td>
                </tr>
                {/* <tr>
                  <td>
                    <h2>経営偏差値 (後期): {deviation.経営後期}</h2>
                  </td>
                  <td></td>
                </tr> */}
              </tbody>
            </table>

            {/* <h2>経営偏差値 (前期): {deviation.経営前期}</h2>
            <h2>経営偏差値 (後期): {deviation.経営後期}</h2> */}
            {/* {track === "文系" ? (
              <div>
                <h2>経営偏差値 (前期): {deviation.経営前期}</h2>
                <h2>経営偏差値 (後期): {deviation.経営後期}</h2>
              </div>
            ) : (
              <p></p>
            )} */}
          </div>
          <button
            onClick={handleBack}
            style={{ marginTop: "20px", padding: "10px 20px", width: "100%" }}
          >
            戻る
          </button>
        </>
      )}
    </div>
  );
};

export default CalculateScore;
