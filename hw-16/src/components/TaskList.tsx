import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  toggleTaskStatus,
  deleteTask,
  editTaskText,
  type Task,
} from "../store/tasksSlice";

export const TaskList = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.items);
  const filters = useAppSelector((state) => state.filters);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text
      .toLowerCase()
      .includes(filters.searchQuery.toLowerCase());

    const matchesStatus =
      filters.status === "all" ||
      (filters.status === "completed" && task.completed) ||
      (filters.status === "active" && !task.completed);

    const matchesPriority =
      filters.priority === "all" || task.priority === filters.priority;

    const matchesCategory =
      filters.category === "all" || task.category === filters.category;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id: string) => {
    dispatch(editTaskText({ id, text: editText }));
    setEditingId(null);
  };

  if (filteredTasks.length === 0) {
    return (
      <div className="border-t border-white/5 pt-6">
        <p className="label-hud">Завдання</p>
        <div className="border border-dashed border-white/10 px-6 py-12 text-center">
          <p className="font-display text-base font-medium text-[#f2eee4]">
            Завдань поки немає
          </p>
          <p className="mt-2 text-sm text-steel">
            Жодного завдання не знайдено за вказаними фільтрами.
          </p>
        </div>
      </div>
    );
  }

  const getPriorityClasses = (p: string) => {
    if (p === "high") return "border-alert/35 bg-alert/5";
    if (p === "medium") return "border-brass/25 bg-white/[0.02]";
    return "border-white/10 bg-transparent";
  };

  const getPriorityStripe = (p: string) => {
    if (p === "high") return "bg-alert";
    if (p === "medium") return "bg-brass";
    return "bg-steel";
  };

  const getPriorityBadgeClasses = (p: string) => {
    if (p === "high") return "border-alert/40 text-[#e8c4c6]";
    if (p === "medium") return "border-brass/40 text-brass";
    return "border-white/15 text-steel";
  };

  return (
    <div className="border-t border-white/5 pt-6">
      <p className="label-hud">Завдання</p>
      <ul className="space-y-2">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`relative border p-4 pl-5 transition-colors duration-200 ${getPriorityClasses(
              task.priority
            )} ${task.completed ? "opacity-55" : ""}`}
          >
            <span
              className={`absolute inset-y-0 left-0 w-px ${getPriorityStripe(task.priority)}`}
            />
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 flex-1 items-center gap-3.5">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => dispatch(toggleTaskStatus(task.id))}
                  className="task-check"
                />

                {editingId === task.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={() => saveEdit(task.id)}
                    onKeyDown={(e) => e.key === "Enter" && saveEdit(task.id)}
                    autoFocus
                    className="field flex-1 !py-1"
                  />
                ) : (
                  <div className="flex min-w-0 flex-1 items-center gap-2.5">
                    <span className="shrink-0 border border-white/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-steel uppercase">
                      {task.category}
                    </span>
                    <span
                      style={{
                        textDecoration: task.completed ? "line-through" : "none",
                      }}
                      className={`truncate text-sm font-medium cursor-pointer ${
                        task.completed ? "text-steel" : "text-[#f2eee4]"
                      }`}
                      onClick={() => startEditing(task)}
                      title="Клікніть для редагування"
                    >
                      {task.text}
                    </span>
                  </div>
                )}
              </div>

              <div className="ml-1 flex shrink-0 items-center gap-2">
                <span
                  className={`hidden border px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase sm:inline-block ${getPriorityBadgeClasses(
                    task.priority
                  )}`}
                >
                  {task.priority === "high"
                    ? "Високий"
                    : task.priority === "medium"
                    ? "Середній"
                    : "Низький"}
                </span>
                <button
                  onClick={() => startEditing(task)}
                  className="btn-ghost !px-3 !py-1.5 !text-[10px]"
                >
                  Редагувати
                </button>
                <button
                  onClick={() => dispatch(deleteTask(task.id))}
                  className="btn-alert"
                >
                  Видалити
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
