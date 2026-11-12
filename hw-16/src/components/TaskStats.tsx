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
    <div className="mb-6">
      <p className="label-hud">03 // телеметрія</p>
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="stat-module">
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#9b9578] uppercase">
            Всього
          </span>
          <strong>{total}</strong>
        </div>
        <div className="stat-module border-cyan-neon/30">
          <span className="font-mono text-[10px] tracking-[0.2em] text-cyan-neon uppercase">
            Активних
          </span>
          <strong className="text-cyan-neon! shadow-none!">{active}</strong>
        </div>
        <div className="stat-module border-emerald-400/30">
          <span className="font-mono text-[10px] tracking-[0.2em] text-emerald-400 uppercase">
            Виконаних
          </span>
          <strong className="text-emerald-400! shadow-none!">
            {completed}
            <span className="ml-2 font-mono text-sm font-medium text-emerald-400/80">
              {percentage}%
            </span>
          </strong>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-[#9b9578] uppercase">
            <span>Прогрес виконання</span>
            <span className="text-cyber">{percentage}%</span>
          </div>
          <div className="h-2 overflow-hidden bg-[#1a1a22]">
            <div
              className="h-full bg-cyber shadow-[0_0_16px_rgba(252,238,10,0.7)] transition-all duration-500"
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
