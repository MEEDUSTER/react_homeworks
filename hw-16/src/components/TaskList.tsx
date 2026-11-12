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
      <div>
        <p className="label-hud">04 // потік завдань</p>
        <div className="border border-dashed border-cyber/30 bg-void/50 px-6 py-12 text-center">
          <p className="font-display text-lg font-bold tracking-widest text-cyber uppercase">
            No data
          </p>
          <p className="mt-2 font-mono text-xs tracking-widest text-[#9b9578] uppercase">
            Жодного завдання не знайдено за вказаними фільтрами.
          </p>
        </div>
      </div>
    );
  }

  const getPriorityClasses = (p: string) => {
    if (p === "high") return "border-alert/50 bg-alert/8";
    if (p === "medium") return "border-cyber/35 bg-cyber/5";
    return "border-cyan-neon/35 bg-cyan-neon/5";
  };

  const getPriorityStripe = (p: string) => {
    if (p === "high") return "bg-alert shadow-[0_0_12px_#e8232e]";
    if (p === "medium") return "bg-cyber shadow-[0_0_12px_#fcee0a]";
    return "bg-cyan-neon shadow-[0_0_12px_#00f0ff]";
  };

  const getPriorityBadgeClasses = (p: string) => {
    if (p === "high") return "border-alert text-alert";
    if (p === "medium") return "border-cyber text-cyber";
    return "border-cyan-neon text-cyan-neon";
  };

  return (
    <div>
      <p className="label-hud">04 // потік завдань</p>
      <ul className="space-y-2">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`relative overflow-hidden border p-4 pl-5 transition-all duration-200 ${getPriorityClasses(
              task.priority
            )} ${task.completed ? "opacity-60" : ""}`}
          >
            <span
              className={`absolute inset-y-0 left-0 w-1 ${getPriorityStripe(task.priority)}`}
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
                    <span className="shrink-0 border border-cyber/25 bg-void px-2 py-0.5 font-mono text-[10px] tracking-widest text-cyber uppercase">
                      {task.category}
                    </span>
                    <span
                      style={{
                        textDecoration: task.completed ? "line-through" : "none",
                      }}
                      className={`truncate text-sm font-semibold cursor-pointer ${
                        task.completed ? "text-[#8c876d]" : "text-[#f4efd0]"
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
                  className={`hidden border px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase sm:inline-block ${getPriorityBadgeClasses(
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
