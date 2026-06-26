import type { Todo } from '../types';
import TodoItem from './TodoItem';
import styles from '../styles/TodoList.module.css';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return <p className={styles.emptyState}>Тут поки що порожньо 🌿</p>;
  }

  return (
    <div className={styles.todoContainer}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TodoList;