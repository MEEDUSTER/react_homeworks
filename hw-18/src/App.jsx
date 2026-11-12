import Counter from './Counter';
import './App.css';

export default function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <p className="app-kicker">Система обліку</p>
        <h1>React Counter App</h1>
        <p className="app-lede">Два незалежні модулі з короткою історією змін.</p>
      </header>
      <div className="counters-wrapper">
        <Counter title="Лічильник 1" />
        <Counter title="Лічильник 2" />
      </div>
    </div>
  );
}
