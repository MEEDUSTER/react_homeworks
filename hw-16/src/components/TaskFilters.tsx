import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  setSearchQuery,
  setCategoryFilter,
  setPriorityFilter,
  setStatusFilter,
  resetFilters,
  type StatusFilter,
} from "../store/filtersSlice";
import { type Priority } from "../store/tasksSlice";

export const TaskFilters = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const tasks = useAppSelector((state) => state.tasks.items);

  const categories = Array.from(
    new Set(tasks.map((t) => t.category).filter(Boolean))
  );

  return (
    <div className="mb-6 border border-cyan-neon/20 bg-[#07070d]/80 p-4 sm:p-5">
      <p className="label-hud">02 // фільтри</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Пошук завдань..."
          value={filters.searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="field flex-1"
        />

        <select
          value={filters.status}
          onChange={(e) =>
            dispatch(setStatusFilter(e.target.value as StatusFilter))
          }
          className="field sm:w-40"
        >
          <option value="all">Усі статуси</option>
          <option value="active">Активні</option>
          <option value="completed">Виконані</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) =>
            dispatch(setPriorityFilter(e.target.value as "all" | Priority))
          }
          className="field sm:w-44"
        >
          <option value="all">Усі пріоритети</option>
          <option value="low">Низький пріоритет</option>
          <option value="medium">Середній пріоритет</option>
          <option value="high">Високий пріоритет</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
          className="field sm:w-40"
        >
          <option value="all">Усі категорії</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button
          onClick={() => dispatch(resetFilters())}
          className="btn-ghost shrink-0"
        >
          Скинути
        </button>
      </div>
    </div>
  );
};
