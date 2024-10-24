import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InputPage from './components.v1/InputPage';  // Update path to components folder
import ResultPage from './components.v1/ResultPage';  // Update path to components folder

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<InputPage />} />
        <Route path="/summary" element={<ResultPage />} />
      </Routes>
    </div>
  );
}

export default App;