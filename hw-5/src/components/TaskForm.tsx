import { useState, type FormEvent } from 'react';
import type { Todo } from '../types';
import styles from '../styles/TaskForm.module.css';

interface TaskFormProps {
  onAdd: (todo: Omit<Todo, 'id' | 'completed'>) => void;
  onSort: () => void;
}

function TaskForm({ onAdd, onSort }: TaskFormProps) {
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState<Todo['priority']>('high');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedText = text.trim();
    if (!trimmedText) {
      return;
    }

    onAdd({
      text: trimmedText,
      date: date || null,
      priority,
    });

    setText('');
    setDate('');
    setPriority('high');
  };

  return (
    <form className={styles.controls} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.input}
        placeholder="Що потрібно зробити?"
        autoComplete="off"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />

      <div className={styles.formRow}>
        <div className={styles.formField}>
          <label htmlFor="todo-date">⏰ Дедлайн</label>
          <input
            type="datetime-local"
            className={styles.input}
            id="todo-date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        <div className={styles.formField}>
          <label htmlFor="todo-priority">🎯 Пріоритет</label>
          <select
            id="todo-priority"
            className={styles.select}
            value={priority}
            onChange={(event) => setPriority(event.target.value as Todo['priority'])}
          >
            <option value="low">🟢 Низький</option>
            <option value="normal">🟡 Нормальний</option>
            <option value="high">🔴 Високий</option>
          </select>
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button type="submit" className={`${styles.btn} ${styles.btnAdd}`}>
          + Додати
        </button>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnSort}`}
          onClick={onSort}
        >
          ↕ Сортувати
        </button>
      </div>
    </form>
  );
}

export default TaskForm;