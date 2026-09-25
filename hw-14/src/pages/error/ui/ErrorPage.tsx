import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { Home, RefreshCw } from 'lucide-react';

export function ErrorPage() {
  const error = useRouteError();
  console.error('Route error captured:', error);

  let errorMessage = 'Щось пішло не так. Спробуйте пізніше.';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    if (error.status === 404) {
      errorMessage = 'Ой! Такої сторінки не існує (404).';
    } else if (error.status === 401) {
      errorMessage = 'У вас немає доступу до цієї сторінки.';
    } else {
      errorMessage = error.data?.message || error.statusText || 'Помилка роутингу.';
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 text-center bg-[#090d16] text-slate-100 relative overflow-hidden">
      {/* Glow effect */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="bg-slate-900/80 p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl max-w-md w-full backdrop-blur-2xl relative z-10">
        <div className="w-20 h-20 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl flex items-center justify-center text-3xl font-black mb-6 mx-auto shadow-lg shadow-rose-500/10">
          {errorStatus}
        </div>

        <h2 className="text-2xl font-bold text-slate-100 mb-2">Сталася помилка</h2>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed">{errorMessage}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition duration-200 border border-white/10"
          >
            <Home className="w-4 h-4" />
            <span>На головну</span>
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 font-semibold rounded-xl border border-white/10 transition duration-200 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Оновити</span>
          </button>
        </div>
      </div>
    </div>
  );
}
