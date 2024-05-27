import React, { useEffect } from "react";
import axios from "axios";
import Navigation from "./components/navigation";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import "./App.css";

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
    <div className="App">
      <Header />
      <Navigation />
      <p>
        本サイトは横浜国立大学2023年度における経済学部、経営学部の大まかな共通テストの偏差値の得点を算出するサイトです。
      </p>
      <Main />
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
  );
};

export default App;
