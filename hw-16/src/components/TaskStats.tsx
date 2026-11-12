import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearCompletedTasks } from "../store/tasksSlice";

export const TaskStats = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.items);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const active = total - completed;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="mb-8 border-t border-white/5 pt-6">
      <p className="label-hud">Статистика</p>
      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="stat-module">
          <span className="font-mono text-[10px] tracking-[0.18em] text-steel uppercase">
            Всього
          </span>
          <strong>{total}</strong>
        </div>
        <div className="stat-module is-active">
          <span className="font-mono text-[10px] tracking-[0.18em] text-steel uppercase">
            Активних
          </span>
          <strong>{active}</strong>
        </div>
        <div className="stat-module is-done">
          <span className="font-mono text-[10px] tracking-[0.18em] text-steel uppercase">
            Виконаних
          </span>
          <strong>
            {completed}
            <span className="ml-2 font-mono text-sm font-medium text-steel">
              {percentage}%
            </span>
          </strong>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center justify-between font-mono text-[10px] tracking-[0.16em] text-steel uppercase">
            <span>Прогрес виконання</span>
            <span className="text-brass">{percentage}%</span>
          </div>
          <div className="h-px overflow-visible bg-[#2a2e36]">
            <div
              className="h-0.5 bg-brass transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        {completed > 0 && (
          <button
            onClick={() => dispatch(clearCompletedTasks())}
            className="btn-alert shrink-0"
          >
            Видалити виконані
          </button>
        )}
      </div>
    </div>
  );
};
