import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./Pages/Home";
import './Css/index.css'
import React from 'react'
import ReactDOM from "react-dom/client";
import Test from "./Pages/Test";





const root = document.getElementById("root");

ReactDOM.createRoot(root).render(

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<Test />} />

    </Routes>
  </BrowserRouter>


)
