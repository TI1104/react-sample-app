import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TreeDetailPage from "./TreeDetailPage";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PineTreePage />} />
                <Route path="/tree" element={<TreeDetailPage tree={trees[0]} />} />
            </Routes>
        </Router>
    );
};

export default App;
