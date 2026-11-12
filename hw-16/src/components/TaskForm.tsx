import React, { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { addTask, type Priority } from "../store/tasksSlice";

export const TaskForm = () => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    dispatch(addTask({ text, category, priority }));
    setText("");
    setCategory("");
    setPriority("medium");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <p className="label-hud">Нове завдання</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Що потрібно зробити?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="field flex-1"
        />
        <input
          type="text"
          placeholder="Категорія (напр. Робота)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="field sm:w-48"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="field sm:w-52"
        >
          <option value="low">Низький пріоритет</option>
          <option value="medium">Середній пріоритет</option>
          <option value="high">Високий пріоритет</option>
        </select>
        <button type="submit" className="btn-cyber shrink-0">
          Додати
        </button>
      </div>
    </form>
  );
};
