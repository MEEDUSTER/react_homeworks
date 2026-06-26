import { useMemo, useState } from 'react';
import type { Todo } from './types';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import Counter from './components/Counter';
import TodoList from './components/TodoList';

const initialTodos: Todo[] = [
  {
    id: '1',
    text: 'Жити',
    completed: false,
    priority: 'low',
    date: '2099-06-20T12:00',
  },
  {
    id: '2',
    text: 'Купити квартиру в Хмельницькому???',
    completed: false,
    priority: 'high',
    date: '2033-03-20T12:00',
  },
  {
    id: '3',
    text: 'Купити квас Тарас Чорний',
    completed: true,
    priority: 'normal',
    date: '2026-06-20T12:00',
  },
];

function App() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const totalCount = todos.length;
  const completedCount = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos],
  );

  const handleAddTodo = (todo: Omit<Todo, 'id' | 'completed'>) => {
    const newTodo: Todo = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      completed: false,
      ...todo,
    };

    setTodos((current) => [newTodo, ...current]);
  };

  const handleToggleTodo = (id: string) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  };

  const handleSortTodos = () => {
    const priorityOrder: Record<Todo['priority'], number> = {
      high: 0,
      normal: 1,
      low: 2,
    };

    setTodos((current) =>
      [...current].sort((a, b) => {
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1;
        }

        if (a.date && b.date) {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }

        if (a.date) {
          return -1;
        }

        if (b.date) {
          return 1;
        }

        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }),
    );
  };

  return (
    <>
      <Header />
      <TaskForm onAdd={handleAddTodo} onSort={handleSortTodos} />
      <Counter total={totalCount} completed={completedCount} />
      <TodoList
        todos={todos}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
      />
    </>
  );
}

export default App;