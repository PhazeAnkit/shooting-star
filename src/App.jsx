// src/App.jsx
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LandingPage from "./pages/Landing"; 
import CreatePollPage from "./pages/CreatePollPage";
import QuestionPage from "./pages/questionPage";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Link to="/landing">Landing</Link> 
        <Link to="/CreatePollPage">Poll Page</Link>
        <Link to='/questionPage'>Question Page</Link>

      </div>
    
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/CreatePollPage" element={<CreatePollPage/>}/>
        <Route path="/questionPage" element={<QuestionPage/>}/>
      </Routes>
    </Router>
  );
}
