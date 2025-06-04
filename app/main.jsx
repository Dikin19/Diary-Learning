import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ React 18
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // ✅ gunakan `Routes`, bukan `Switch`
import { Provider } from 'react-redux';

import Reactbits from './Pages/Reactbits';
import DiaryContent from './Pages/DiaryContent';
import DiaryFeed from './Pages/DiaryFeed';
import './Css/index.css';
import store from './store';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Root element not found");

ReactDOM.createRoot(rootElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DiaryFeed />} />
        <Route path="/reactbits" element={<Reactbits />} />
        <Route path="/diary" element={<DiaryContent />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
