import { TaskForm } from "./components/TaskForm";
import { TaskFilters } from "./components/TaskFilters";
import { TaskStats } from "./components/TaskStats";
import { TaskList } from "./components/TaskList";

export default function App() {
  return (
    <div className="relative min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-5xl">
        <header className="mb-10">
          <p className="mb-3 font-mono text-[11px] tracking-[0.22em] text-brass uppercase">
            Система керування завданнями
          </p>
          <h1 className="font-display max-w-3xl text-3xl font-semibold tracking-tight text-[#f2eee4] sm:text-5xl sm:leading-[1.1]">
            Панель керування завданнями
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-steel sm:text-base">
            Додавайте, фільтруйте й закривайте задачі в одному робочому просторі — без шуму, лише те, що треба зробити.
          </p>
        </header>

        <main className="hud-frame p-5 sm:p-8">
          <span className="hud-corner-tr" />
          <span className="hud-corner-bl" />
          <TaskForm />
          <TaskFilters />
          <TaskStats />
          <TaskList />
        </main>
      </div>
    </div>
  );
}
