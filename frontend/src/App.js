import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Chatbot from './components/chatbot';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/chatbot' element={<Chatbot/>}/>
      </Routes>
    </Router>
  );
}

export default App;
