import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TreeDetailPage = ({ tree }) => {
  const navigate = useNavigate();
  const [pushCount, setPushCount] = useState(0);

  const handlePush = () => {
    setPushCount(pushCount + 1);
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/house.jpg')" }}
    >
      {/* 左上の「ホームに戻る」リンク */}
      <div className="absolute top-4 left-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={() => navigate("/")} // ホームに戻る
        >
          ホームに戻る
        </button>
      </div>

      {/* 中央の木の詳細表示 */}
      <div className="flex flex-col items-center justify-center min-h-screen">
        {/* 木の画像 */}
        <div className="relative">
          <img src={tree.image} alt={tree.name} className="w-64 h-64 mb-4" />
          {/* 木の上に押した回数 */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full text-black">
            {pushCount} 回押されました
          </div>
        </div>
        {/* 木の名前 */}
        <h1 className="text-3xl font-bold mb-4">{tree.name}</h1>
        {/* 左のアイコン画像 */}
        <div className="absolute top-1/2 left-8 transform -translate-y-1/2">
          <img src="/icon.png" alt="Icon" className="w-16 h-16 rounded-full" />
        </div>
        {/* PUSHボタン */}
        <button
          onClick={handlePush}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700"
        >
          PUSH
        </button>
      </div>
    </div>
  );
};

export default TreeDetailPage;
