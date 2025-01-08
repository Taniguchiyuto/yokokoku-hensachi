import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//Firestoreの初期化
const db = getFirestore(app);

class Post {
  id: string | null;
  content: string;
  timestamp: Date;

  constructor(data: { id?: string; content: string; timestamp: Date }) {
    this.id = data.id || null;
    this.content = data.content;
    this.timestamp = data.timestamp;
  }
}

const BulletinBoard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState<string>("");

  // Firestoreからデータを取得する関数

  const fetchPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const fetchedPosts: Post[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return new Post({
          id: doc.id,
          content: data.content,
          timestamp: data.timestamp.toDate(), // FirestoreのタイムスタンプをDate型に変換
        });
      });

      setPosts(fetchedPosts);
      console.log("Firestoreから取得した投稿:", fetchedPosts);
    } catch (error) {
      console.error(
        "Firestoreからデータを取得中にエラーが発生しました:",
        error
      );
    }
  };

  // 初回レンダリング時にデータを取得
  useEffect(() => {
    fetchPosts();
  }, []);

  //Firestoreにデータを追加する関数
  const addPost = async () => {
    if (newPost.trim() === "") return;

    const newPostObj = { content: newPost, timestamp: new Date() };
    try {
      const docRef = await addDoc(collection(db, "posts"), newPostObj);
      console.log("投稿が保存されました:", docRef.id);

      setPosts((prevPosts) => [
        ...prevPosts,
        new Post({
          id: docRef.id,
          content: newPostObj.content,
          timestamp: newPostObj.timestamp,
        }),
      ]);
      setNewPost("");
    } catch (error) {
      console.error("Firestoreに投稿を保存中にエラーが発生しました:", error);
    }
  };

  const deletePost = (index: number) => {
    setPosts(posts.filter((_, i) => i !== index)); // 指定されたインデックス以外を残す
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column", // 縦方向に配置
        justifyContent: "center", // 縦方向の中央揃え
        alignItems: "center", // 横方向の中央揃え
        // height: "100vh", // 画面全体の高さ
        // textAlign: "center", // テキストを中央揃え（任意）
      }}
    >
      <h1>掲示板</h1>
      {/* <textarea
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder="新しい投稿を入力してください"
        rows={4}
        cols={50}
        style={{
          marginBottom: "10px", // ボタンと間隔を開ける
        }}
      />
      <button
        onClick={addPost}
        style={{
          marginBottom: "20px", // リストと間隔を開ける
          padding: "10px 20px",
        }}
      >
        投稿する
      </button> */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          width: "80%", // リストの幅を調整
        }}
      >
        {posts.map((post, index) => (
          <li
            key={index} // インデックスをkeyに使用（推奨されないがidがないため暫定的に使用）
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              marginBottom: "10px",
              textAlign: "left", // テキストは左寄せ（必要に応じて調整）
            }}
          >
            <div
              style={{
                marginTop: "10px",
                marginBottom: "20px",
              }}
            >
              {post.content}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between", // 左右にスペースを確保
                alignItems: "center", // 垂直方向の中央揃え
              }}
            >
              <small>{post.timestamp.toLocaleString()}</small>
              {/* <button
                onClick={() => deletePost(index)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
              >
                削除
              </button> */}
            </div>
          </li>
        ))}
      </ul>
      <textarea
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder="新しい投稿を入力してください"
        rows={4}
        cols={50}
        style={{
          marginBottom: "10px", // ボタンと間隔を開ける
          height: "100px",
        }}
      />
      <button
        onClick={addPost}
        style={{
          marginBottom: "20px", // リストと間隔を開ける
          padding: "10px 20px",
        }}
      >
        投稿する
      </button>
    </div>
  );
};

export default BulletinBoard;
