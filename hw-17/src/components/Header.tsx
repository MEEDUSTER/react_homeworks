import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="site-header mb-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="group">
          <span className="font-mono text-[10px] tracking-[0.22em] text-brass uppercase">
            Випуск
          </span>
          <span className="font-display mt-0.5 block text-xl font-semibold tracking-tight text-[#f2eee4] group-hover:text-brass transition-colors">
            NewsPortal
          </span>
        </Link>
        <nav>
          <Link
            to="/"
            className="font-mono text-xs tracking-[0.16em] text-steel uppercase transition-colors hover:text-brass"
          >
            Головна
          </Link>
        </nav>
      </div>
    </header>
  );
};
