import { useState } from 'react';
import './App.css';

function Counter({ title, primaryColor, secondaryColor }) {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([0]);
  const [isAccent, setIsAccent] = useState(true);

  const pushHistory = (value) => {
    setHistory((current) => [value, ...current].slice(0, 5));
  };

  const changeCount = (nextValue) => {
    setCount(nextValue);
    pushHistory(nextValue);
  };

  const handleIncrement = () => changeCount(count + 1);
  const handleDecrement = () => changeCount(count - 1);
  const handleReset = () => changeCount(0);
  const handleToggle = () => setIsAccent((prev) => !prev);

  return (
    <section className="counter-card" style={{ '--card-color': isAccent ? primaryColor : secondaryColor }}>
      <h2>{title}</h2>
      <div className="count-display">{count}</div>
      <div className="button-group">
        <button onClick={handleDecrement} className="button secondary">
          Зменшити
        </button>
        <button onClick={handleIncrement} className="button primary">
          Збільшити
        </button>
      </div>
      <div className="button-group">
        <button onClick={handleReset} className="button reset">
          Скинути
        </button>
        <button onClick={handleToggle} className="button toggle">
          Змінити колір
        </button>
      </div>
      <div className="history-block">
        <h3>Останні 5 значень</h3>
        <ul>
          {history.map((value, index) => (
            <li key={`${value}-${index}`}>{value}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function App() {
  return (
    <main className="app-shell">
      <header className="hero-panel">
        <div>
          <span className="badge">React Домашнє завдання</span>
          <h1>Інтерактивний лічильник</h1>
          <p>Навчальний проєкт з компонентів, useState та історії значень.</p>
        </div>
      </header>

      <div className="counter-grid">
        <Counter title="Основний лічильник" primaryColor="#5b8def" secondaryColor="#22c55e" />
        <Counter title="Другий незалежний лічильник" primaryColor="#f97316" secondaryColor="#8b5cf6" />
      </div>
    </main>
  );
}

export default App;
