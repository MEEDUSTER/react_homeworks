import { TaskForm } from "./components/TaskForm";
import { TaskFilters } from "./components/TaskFilters";
import { TaskStats } from "./components/TaskStats";
import { TaskList } from "./components/TaskList";

export default function App() {
  return (
    <div className="relative min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] tracking-[0.22em] text-cyan-neon/80 uppercase">
          <span>NODE // HW-16</span>
          <span className="text-cyber">TASK.OS // ONLINE</span>
          <span>LINK: ACTIVE</span>
        </div>

        <header className="mb-8">
          <p className="mb-3 font-mono text-[11px] tracking-[0.28em] text-magenta-neon uppercase">
            // протокол керування завданнями
          </p>
          <h1
            className="glitch font-display text-3xl font-black tracking-wide uppercase sm:text-6xl sm:leading-[0.95]"
            data-text="Панель керування завданнями"
          >
            Панель керування завданнями
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#cfc8a4] sm:text-base">
            Організуйте свої справи швидко та зручно. Додавайте, фільтруйте й закривайте задачі в одному терміналі.
          </p>
        </header>

        <main className="hud-frame p-4 sm:p-7">
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
