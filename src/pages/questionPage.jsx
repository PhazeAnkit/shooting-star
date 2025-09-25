import { useEffect, useState } from "react";
import "./questionPage.css";
import Timer from "../assets/timer.svg";

export default function QuestionPage({ role = "teacher" }) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const question = {
    number: 1,
    text: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
  };

  const results = [10, 4, 2, 1];

  // Countdown
  useEffect(() => {
    if (showResults) return;

    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setShowResults(true);
    }
  }, [timeLeft, showResults]);

  const handleSubmit = () => {
    if (selectedOption !== null) {
      console.log("Student submitted:", question.options[selectedOption]);
      setShowResults(true);
      setTimeLeft(0);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="question-page">
        {/* Header */}
        <header className="question-header">
          <h2>Question {question.number}</h2>
          <div className={`timer ${timeLeft <= 15 ? "urgent" : ""}`}>
            <img src={Timer} className="timer-logo" alt="Timer Logo" />
            {timeLeft > 0 && !showResults ? `${timeLeft}s left` : "Results"}
          </div>
        </header>

        <main className="question-body">
          <div className="question">
            <h3>{question.text}</h3>
          </div>
          <div className="options">
            {question.options.map((opt, idx) => (
              <div
                key={idx}
                className={`option ${
                  role === "student" && selectedOption === idx ? "selected" : ""
                }`}
                onClick={() =>
                  role === "student" && !showResults
                    ? setSelectedOption(idx)
                    : null
                }
              >
                <span>{opt}</span>
                {showResults && (
                  <div className="result-bar">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${
                          (results[idx] / results.reduce((a, b) => a + b, 0)) *
                          100
                        }%`,
                      }}
                    ></div>
                    <span className="vote-count">{results[idx]} votes</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>

        <footer className="question-footer">
          {role === "teacher" ? (
            <>
              <button className="end-btn">End Poll</button>
              <button className="next-btn">Next Question</button>
            </>
          ) : (
            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={selectedOption === null || showResults}
            >
              Submit
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}
