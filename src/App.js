import React, { useState, useEffect } from 'react';
import Prr from './Prr';

function App() {
  const [text, setText] = useState("");
  const [timer, setTimer] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [typingStarted, setTypingStarted] = useState(false);
  const [typingFinished, setTypingFinished] = useState(false);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setText(inputValue);
    setTypingStarted(true);

    if (inputValue.trim() && timer === null) {
      setTimer(60); // Start the timer at 60 seconds
    }
  }

  useEffect(() => {
    if (timer === 0) {
      clearInterval(timer);
      setTypingFinished(true); // Set typingFinished flag to true when timer reaches 0
    }
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);
    setCharCount(text.length);
  }, [text]);

  return (
    <div className="App">
      <header className="App-header">
        <Prr name="My Typing Test App"/>
      </header>

      {/* Render textarea only if typing time hasn't finished */}
      {!typingFinished && (
        <textarea onChange={handleChange} value={text} style={{ width: '80%', height: '200px', resize: 'none' }} />
      )}

      {/* Display word count and character count */}
      <p>Word count: {wordCount}, Char count: {charCount}</p>

      <br/>
      <h3>Timer: {timer !== null ? timer : (typingStarted ? "Start typing to begin" : "Waiting for typing...")}</h3>
    </div>
  );
}

export default App;
