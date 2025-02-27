import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import axios from "axios";
import Navigation from "./components/navigation";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import "./App.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import BulletinBoard from "./coment.tsx";
import CalculateScore from "./CalculateScore.js";
import { CSSTransition } from "react-transition-group"; // 追加

const App = () => {
  useEffect(() => {
    // サーバーにリクエストを送信してCookieを設定
    axios
      .get("http://localhost:3000", { withCredentials: true })
      .then((response) => {
        console.log("Cookie set:", response);
      })
      .catch((error) => {
        console.error("Error setting cookie:", error);
      });
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <Helmet>
            <title>横国偏差値換算サイト</title>

            <meta
              name="description"
              content="本サイトは横浜国立大学2023年度における経済学部、経営学部の大まかな共通テストの偏差値の得点を算出するサイトです。"
            />
            <meta
              name="keywords"
              content="横浜国立大学, 共通テスト, 偏差値, 経済学部, 経営学部"
            />
            <meta property="og:title" content="横国偏差値換算サイト" />
            <meta
              property="og:description"
              content="本サイトは横浜国立大学2023年度における経済学部、経営学部の大まかな共通テストの偏差値の得点を算出するサイトです。"
            />
            <meta property="og:type" content="website" />
          </Helmet>
          <Analytics />
          <CSSTransition
            in={true}
            appear={true}
            timeout={500}
            classNames="header-fade"
          >
            <div>
              <Header />
            </div>
          </CSSTransition>
          <Navigation />
          {/* Mainを条件付きで表示 */}

          {/* <Routes>
            <Route path="/calculate-score" element={<CalculateScore />} />
          </Routes> */}

          <p>
            本サイトは横浜国立大学2023年度における経済学部、経営学部の大まかな共通テストの偏差値の得点を算出するサイトです。
          </p>
          {/* Mainを条件付きで表示 */}
          {/* <MainVisibilityManager /> */}
          <CalculateScore />
          {/* <Main /> */}
          <BulletinBoard />
          <p>
            当サイトは、公開されているデータネットの情報を元に作成しておりますが、多少の誤差が含まれている可能性がございます。そのため、情報の正確性については万全を期しておりますが、完全な保証はできかねますので、ご了承ください。
          </p>
          <p>
            横浜国立大学の図書館の写真:著者:
            <span>
              <a
                href="https://commons.wikimedia.org/wiki/User:On-chan"
                target="_blank"
                rel="noopener noreferrer"
              >
                On-chan
              </a>
            </span>
            CC 表示-継承 3.0
          </p>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
};

//パスに応じてMainを表示するか判定する関数

const MainVisibilityManager = () => {
  const location = useLocation(); // 現在のURLを取得
  const shouldShowMain = location.pathname !== "/calculate-score"; // Mainを表示するか判定

  return shouldShowMain ? <Main /> : null; // 条件付きでMainをレンダリング
};

export default App;
