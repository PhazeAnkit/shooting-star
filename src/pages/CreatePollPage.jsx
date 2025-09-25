import { useState } from "react";
import "./createPoll.css";
import IntervueLogo from "../components/intervueLogo";

export default function CreateQuestionPage() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", ""]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(null);
  const [timer, setTimer] = useState("30");

  const MAX_WORDS = 100;

  const getWordCount = (text) =>
    text.trim().split(/\s+/).filter(Boolean).length;

  const handleQuestionChange = (e) => {
    const inputText = e.target.value;
    const wordCount = getWordCount(inputText);
    if (wordCount <= MAX_WORDS) {
      setQuestion(inputText);
    }
  };

  const handleOptionChange = (value, index) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addOption = () => {
    if (options.length < 6) setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    if (options.length <= 2) return;

    const confirmed = window.confirm(
      "Are you sure you want to remove this option?"
    );
    if (!confirmed) return;

    const updated = options.filter((_, i) => i !== index);

    if (correctOptionIndex === index) {
      setCorrectOptionIndex(null);
    } else if (correctOptionIndex > index) {
      setCorrectOptionIndex(correctOptionIndex - 1);
    }

    setOptions(updated);
  };

  const handleSubmit = () => {
    const trimmedOptions = options
      .map((opt, i) => ({ text: opt.trim(), originalIndex: i }))
      .filter((opt) => opt.text !== "");

    if (
      !question.trim() ||
      trimmedOptions.length < 2 ||
      correctOptionIndex === null
    ) {
      alert(
        "Please complete the question, add at least 2 options, and select the correct one."
      );
      return;
    }

    const correctOriginalIndex = correctOptionIndex;
    const newCorrectIndex = trimmedOptions.findIndex(
      (opt) => opt.originalIndex === correctOriginalIndex
    );

    if (newCorrectIndex === -1) {
      alert("The correct option was removed or is now empty.");
      return;
    }

    const payload = {
      question: question.trim(),
      options: trimmedOptions.map((opt) => opt.text),
      correctAnswer: trimmedOptions[newCorrectIndex].text,
      timer,
    };

    console.log("Question Created:", payload);
  };

  return (
    <div className="question-wrapper">
      <div className="logo-wrapper">
        <IntervueLogo />
      </div>

      <div className="question-container">
        <h2 className="title">
          Let's <span>Get Started</span>
        </h2>
        <p className="subtitle">
          Ask your question and provide answer options.
        </p>

        <div className="form-group">
          <div className="head">
            <label className="form-label">Enter Your Question</label>
            <select
              id="timer"
              name="timer"
              value={timer}
              onChange={(e) => setTimer(e.target.value)}
            >
              <option value="30">30 Seconds</option>
              <option value="45">45 Seconds</option>
              <option value="60">60 Seconds</option>
              <option value="90">90 Seconds</option>
            </select>
          </div>

          <div className="textarea-wrapper">
            <textarea
              value={question}
              placeholder="Enter your question..."
              onChange={handleQuestionChange}
              className="form-input"
              rows={3}
            />
            <div className="word-count-inside">
              {getWordCount(question)} / {MAX_WORDS} words
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="head">
            <label className="form-label">Options:</label>
            <label className="correct-option">Correct Option</label>
          </div>

          <div className="options-list">
            {options.map((opt, idx) => (
              <div
                className={`option-row ${
                  correctOptionIndex === idx ? "correct" : ""
                }`}
                key={idx}
              >
                <span className="option-number">{idx + 1}.</span>

                <input
                  type="text"
                  placeholder={`Option ${idx + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(e.target.value, idx)}
                  className="form-input option-input"
                />

                <input
                  type="radio"
                  id={`correct-${idx}`}
                  name="correct"
                  checked={correctOptionIndex === idx}
                  onChange={() => setCorrectOptionIndex(idx)}
                  className="radio-btn"
                  aria-label={`Mark option ${idx + 1} as correct`}
                />
                <label htmlFor={`correct-${idx}`} className="sr-only">
                  Correct
                </label>

                {options.length > 2 && (
                  <button
                    className="remove-btn"
                    onClick={() => removeOption(idx)}
                    title="Remove Option"
                    disabled={options.length <= 2}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            {options.length < 6 && (
              <button className="add-option-btn" onClick={addOption}>
                + Add Option
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
