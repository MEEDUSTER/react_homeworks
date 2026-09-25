import { Form, useActionData, useNavigation } from 'react-router-dom';
import { Lock, User, LogIn, AlertCircle, Loader2 } from 'lucide-react';

export function LoginForm() {
  const actionData = useActionData() as { error?: string } | undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="w-full bg-slate-900/70 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight mb-2">
          Вхід до TMDB
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Авторизуйтесь через свій обліковий запис The Movie Database
        </p>
      </div>

      {actionData?.error && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-start gap-3 animate-in fade-in duration-200">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <span>{actionData.error}</span>
        </div>
      )}

      <Form method="post" className="space-y-5">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Ім'я користувача (Username)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              name="username"
              type="text"
              required
              disabled={isSubmitting}
              placeholder="Введіть ваш логін TMDB"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/60 border border-white/10 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200 text-sm disabled:opacity-50"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Пароль (Password)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              name="password"
              type="password"
              required
              disabled={isSubmitting}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/60 border border-white/10 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200 text-sm disabled:opacity-50"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-blue-500/25 border border-white/20 flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Авторизація...</span>
            </>
          ) : (
            <>
              <LogIn className="w-5 h-5" />
              <span>Увійти</span>
            </>
          )}
        </button>
      </Form>
    </div>
  );
}
