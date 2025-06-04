import { BrowserRouter, Route, Routes } from "react-router";
import Reactbits from "./Pages/Reactbits";
import './Css/index.css'
import React from 'react'
import ReactDOM from "react-dom/client";
import DiaryContent from "./Pages/DiaryContent";
import DiaryFeed from "./Pages/DiaryFeed";
import { Provider } from "react-redux";
import store from "./store";





const root = document.getElementById("root");

ReactDOM.createRoot(root).render(

  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DiaryFeed />} />
        <Route path="/reactbits" element={<Reactbits />} />
        <Route path="/diary" element={<DiaryContent />} />
      </Routes>
    </BrowserRouter>
  </Provider>


)
