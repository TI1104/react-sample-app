import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoriesPage = () => {
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate(); // ページ遷移のためのhook

  const handleSubmit = () => {
    if (nickname.trim() === "") {
      alert("ニックネームを入力してください！");
      return;
    }
    navigate('/dashboard'); // /dashboardへ遷移
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/yuki.jpg')" }}
    >
      <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <input
          type="text"
          placeholder="ニックネームを入力してください"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          スタート
        </button>
      </div>
    </div>
  );
};

export default CategoriesPage;