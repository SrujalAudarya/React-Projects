import { BrowserRouter, Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import News from './News';
import WeatherApp from './Weather'
import TodoList from './TodoList'

function App() {

  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <div className="main-wrapper"> 
        <Routes>
          <Route path="/" className="pt-5 mt-5" element={<Navigate to="/weather" />} />
          <Route path="/weather" className="pt-5 mt-5" element={<WeatherApp />} />
          <Route path="/news" className="pt-5 mt-5" element={<div style={{paddingTop: '100px'}}><News /></div>} />
          <Route path="/todoList" className="pt-5 mt-5" element={<div style={{paddingTop: '100px'}}><TodoList /></div>} />
        </Routes>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App
