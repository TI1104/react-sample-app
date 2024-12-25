import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import CategoriesPage from "./components/CategoriesPage";
import DashboardPage from "./components/DashboardPage";
import TreeDetailPage from "./components/TreeDetailPage"; // TreeDetailPageのインポート
import Test from "./components/test";

// 木のデータ
const trees = [
  { id: 1, name: "Pine Tree", image: "/first_tree1.png", link: "/pine-tree" },
  { id: 2, name: "Oak Tree", image: "/first_tree2.png", link: "/oak-tree" },
  { id: 3, name: "Maple Tree", image: "/first_tree3.png", link: "/maple-tree" },
];

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/dashboard" element={<Test />} />
        <Route path="/tree-detail" element={<TreeDetailPage />} />

        {/* 各木の詳細ページへのルート */}
        {trees.map((tree) => (
          <Route
            key={tree.id}
            path={tree.link} // リンクに基づいてルートを設定
            element={<TreeDetailPage tree={tree} />}
          />
        ))}
      </Routes>
    </Router>
  );
};

export default App;