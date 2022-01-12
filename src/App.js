import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./features/header/Header";
import { SinglePostPage } from "./features/posts/SinglePostPage";
import Home from "./features/Home";
import NotFound from "./features/404/NotFound";

export default function App() {
  return (
    <>
      <Router>
        <Header></Header>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/posts/:postId" element={<SinglePostPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
