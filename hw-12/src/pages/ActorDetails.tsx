import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { actorApi } from '@/entities/actor';
import { Button } from '@/shared/ui/button';
import { 
  Quote, 
  Flame, 
  Sparkles, 
  Copy, 
  Check, 
  Shuffle, 
  Calendar, 
  MapPin, 
  Film, 
  Star,
  ShieldCheck,
  Dices,
  ArrowLeft,
  Heart
} from 'lucide-react';

// 2010s Tough Guy Quotes Array for Jason Statham (50 quotes in original language)
interface StathamQuote {
  id: number;
  quote: string;
  category: 'братство' | 'мудрість' | 'стволи' | 'вовк';
  cardSuit: '♠' | '♣' | '♥' | '♦';
  movieRef: string;
}

const STATHAM_QUOTES: StathamQuote[] = [
  { id: 1, quote: "Не каждый может взвалить на себя груз ответственности, а я навалил груз на детской площадке.", category: "мудрість", cardSuit: "♠", movieRef: "Бортовой журнал №1" },
  { id: 2, quote: "Если обидели — не обижайся, если ударили — не ударяйся.", category: "мудрість", cardSuit: "♣", movieRef: "Кодекс Стэтхема №2" },
  { id: 3, quote: "Только подкаблучник будет отпрашиваться у жены в бар с друзьями, а настоящий мужик и так знает, что нельзя.", category: "братство", cardSuit: "♦", movieRef: "Пацанские сторис №3" },
  { id: 4, quote: "Красиво делай — красиво будет.", category: "мудрість", cardSuit: "♥", movieRef: "Золотая цитата №4" },
  { id: 5, quote: "Однажды Дед мне говорил «никого не слушай!...» потом еще что-то говорил.", category: "мудрість", cardSuit: "♠", movieRef: "Мудрость деда №5" },
  { id: 6, quote: "Хоть я и лысый, но от фена не откажусь.", category: "мудрість", cardSuit: "♣", movieRef: "Стэтхем Лайф №6" },
  { id: 7, quote: "Я важный, как хуй бумажный.", category: "стволи", cardSuit: "♦", movieRef: "Адреналин №7" },
  { id: 8, quote: "Я два раза, два раза не повторяю, повторяю.", category: "мудрість", cardSuit: "♥", movieRef: "Большой куш №8" },
  { id: 9, quote: "Слово не воробей.", category: "мудрість", cardSuit: "♠", movieRef: "Братское слово №9" },
  { id: 10, quote: "Ничто не воробей, кроме воробья.", category: "вовк", cardSuit: "♣", movieRef: "Глубокая философия №10" },
  { id: 11, quote: "Я по лестнице вверх спустился, а за тем вниз поднялся.", category: "мудрість", cardSuit: "♦", movieRef: "Карты, деньги, два ствола №11" },
  { id: 12, quote: "Бессмысленно осмысливать смысл с неосмысленными мыслями.", category: "мудрість", cardSuit: "♥", movieRef: "Философский трактат №12" },
  { id: 13, quote: "Бесит когда хочется пукнуть в маршрутке, а маршрутки всё нет и нет.", category: "мудрість", cardSuit: "♠", movieRef: "Жизненно №13" },
  { id: 14, quote: "У самурая нет цели — я забрал.", category: "стволи", cardSuit: "♣", movieRef: "Путь самурая №14" },
  { id: 15, quote: "Узнаешь? Я мотал.", category: "братство", cardSuit: "♦", movieRef: "Легенда №15" },
  { id: 16, quote: "Не спеши, а то успеешь.", category: "мудрість", cardSuit: "♥", movieRef: "Перевозчик №16" },
  { id: 17, quote: "Ты узнаешь, что напрасно называют север крайним. Ты увидишь, он бескрайний, это я его краю.", category: "мудрість", cardSuit: "♠", movieRef: "География Стэтхема №17" },
  { id: 18, quote: "Не злите меня и так трупы прятать некуда! Да шучу, шучу… места еще дохуя!", category: "стволи", cardSuit: "♣", movieRef: "Паркер №18" },
  { id: 19, quote: "Некоторые люди как муравьи. Всегда херню какую-то несут.", category: "мудрість", cardSuit: "♦", movieRef: "Наблюдение №19" },
  { id: 20, quote: "Просто будь как моя справка из психушки — потеряйся.", category: "стволи", cardSuit: "♥", movieRef: "Защитник №20" },
  { id: 21, quote: "Единственный, кто тебя поддерживает — твой позвоночник.", category: "братство", cardSuit: "♠", movieRef: "Анатомия пацана №21" },
  { id: 22, quote: "Будут обижать, не обижайся.", category: "мудрість", cardSuit: "♣", movieRef: "Правило №22" },
  { id: 23, quote: "Таранку знаешь? Я протаранил.", category: "стволи", cardSuit: "♦", movieRef: "Смертельная гонка №23" },
  { id: 24, quote: "Когда я родился папа спросил у акушерок: \"Мальчик или девочка?\". Они ответили: \"Мужчина!\"", category: "вовк", cardSuit: "♥", movieRef: "Рождение легенды №24" },
  { id: 25, quote: "Делай как надо. Как не надо, не делай.", category: "мудрість", cardSuit: "♠", movieRef: "Простое правило №25" },
  { id: 26, quote: "Когда Александр Грэм Белл изобрёл телефон, у него было 2 пропущенных звонка от Стэтхэма.", category: "стволи", cardSuit: "♣", movieRef: "История №26" },
  { id: 27, quote: "На трон не сядешь ни чем кроме задницы.", category: "мудрість", cardSuit: "♦", movieRef: "Тронный зал №27" },
  { id: 28, quote: "Как говорил мой дед, не верь ни кому. Потом он еще много чего говорил, но я не верил.", category: "мудрість", cardSuit: "♥", movieRef: "Заповедь деда №28" },
  { id: 29, quote: "Я лысый не потому, что у меня нет волос, а потому, что у волос нет меня.", category: "мудрість", cardSuit: "♠", movieRef: "Стиль №29" },
  { id: 30, quote: "Чтобы быть богатым, нужно всего лишь не быть бедным.", category: "мудрість", cardSuit: "♣", movieRef: "Экономика Стэтхема №30" },
  { id: 31, quote: "Если нет, то нет, а если да, то да!", category: "братство", cardSuit: "♦", movieRef: "Логика №31" },
  { id: 32, quote: "Мертвое море знаете? Так вот, я его убил.", category: "стволи", cardSuit: "♥", movieRef: "Мег: Монстр глубин №32" },
  { id: 33, quote: "Я не девушка, но пизды дать могу.", category: "стволи", cardSuit: "♠", movieRef: "Адреналин 2 №33" },
  { id: 34, quote: "Америку открыл не Колумб, а индейцы.", category: "мудрість", cardSuit: "♣", movieRef: "Историческая правда №34" },
  { id: 35, quote: "Лег пораньше, встал попозже. Народная мудрость.", category: "мудрість", cardSuit: "♦", movieRef: "Режим дня №35" },
  { id: 36, quote: "Если ударил девушку, то не будешь тряпкой — добей её.", category: "братство", cardSuit: "♥", movieRef: "Пацанский кодекс №36" },
  { id: 37, quote: "Даже если у тебя сейчас в жизни темная полоса, помни, что в любой момент она может оказаться взлетной.", category: "мудрість", cardSuit: "♠", movieRef: "Мотивация Стэтхема №37" },
  { id: 38, quote: "Запомни: одна ошибка — и ты ошибся.", category: "мудрість", cardSuit: "♣", movieRef: "Pinterest Top №38" },
  { id: 39, quote: "Работа — не волк. Работа — это ворк, а волк — это ауф! 🐺", category: "вовк", cardSuit: "♦", movieRef: "Pinterest Top №39" },
  { id: 40, quote: "Если заблудился в лесу — иди домой.", category: "мудрість", cardSuit: "♥", movieRef: "Pinterest Top №40" },
  { id: 41, quote: "Не важно, кто против, важно, кто рядом.", category: "братство", cardSuit: "♠", movieRef: "Pinterest Top №41" },
  { id: 42, quote: "Тише едешь — дальше будешь от того места, куда едешь.", category: "мудрість", cardSuit: "♣", movieRef: "Pinterest Top №42" },
  { id: 43, quote: "Дальше едешь — хуй доедешь.", category: "мудрість", cardSuit: "♦", movieRef: "Народная мудрость №43" },
  { id: 44, quote: "Когда пацан падает, он не плачет. Он запоминает, кто его толкнул.", category: "братство", cardSuit: "♥", movieRef: "Pinterest Top №44" },
  { id: 45, quote: "Мужчина должен быть как хороший чай — крепким и не давать слабину.", category: "братство", cardSuit: "♠", movieRef: "Pinterest Top №45" },
  { id: 46, quote: "Если тебе тяжело идти, значит ты идёшь наверх. А если легко — значит ты упал.", category: "мудрість", cardSuit: "♣", movieRef: "Pinterest Top №46" },
  { id: 47, quote: "Встречают по одёжке, провожают по уму. А я промолчал, и все подумали, что я умный.", category: "мудрість", cardSuit: "♦", movieRef: "Pinterest Top №47" },
  { id: 48, quote: "Не бойся ошибаться, бойся не ошибаться.", category: "мудрість", cardSuit: "♥", movieRef: "Pinterest Top №48" },
  { id: 49, quote: "Никогда не сдавайся, иди до конца. А если устал — присядь, отдохни и иди дальше.", category: "мудрість", cardSuit: "♠", movieRef: "Pinterest Top №49" },
  { id: 50, quote: "Живи, кайфуй, гуляй, красуйся. Сделай так, чтобы потом никто не смог сказать, что ты херово прожил эту жизнь.", category: "братство", cardSuit: "♣", movieRef: "Pinterest Top №50" }
];

export default function ActorDetails() {
  const { actorId } = useParams<{ actorId: string }>();
  const id = Number(actorId);
  const navigate = useNavigate();

  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const posterBaseUrl = 'https://image.tmdb.org/t/p/w185';
  const fallbackImage = 'https://placehold.co/500x750/0f172a/94a3b8?text=No+Photo';
  const fallbackPoster = 'https://placehold.co/185x278/0f172a/94a3b8?text=No+Poster';

  // Local state for Statham interactive quotes
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Details fetch
  const { data: details, isLoading: isDetailsLoading, isError: isDetailsError } = useQuery({
    queryKey: ['actor', 'details', id],
    queryFn: () => actorApi.getDetails(id),
    enabled: !isNaN(id),
    staleTime: 10 * 60 * 1000,
  });

  // Credits fetch
  const { data: credits, isLoading: isCreditsLoading } = useQuery({
    queryKey: ['actor', 'credits', id],
    queryFn: () => actorApi.getMovieCredits(id),
    enabled: !isNaN(id),
    staleTime: 10 * 60 * 1000,
  });

  // Check and toggle localStorage favorites
  useEffect(() => {
    if (!details) return;
    try {
      const stored = localStorage.getItem('actor_favorites');
      if (stored) {
        const parsed: any[] = JSON.parse(stored);
        setIsFavorite(parsed.some((a) => a.id === details.id));
      }
    } catch {
      setIsFavorite(false);
    }
  }, [details]);

  const toggleFavorite = () => {
    if (!details) return;
    try {
      const stored = localStorage.getItem('actor_favorites');
      let parsed: any[] = stored ? JSON.parse(stored) : [];
      if (isFavorite) {
        parsed = parsed.filter((a) => a.id !== details.id);
        setIsFavorite(false);
      } else {
        parsed.push({
          id: details.id,
          name: details.name,
          profile_path: details.profile_path,
          popularity: details.popularity,
        });
        setIsFavorite(true);
      }
      localStorage.setItem('actor_favorites', JSON.stringify(parsed));
      window.dispatchEvent(new Event('favorites-updated'));
    } catch (e) {
      console.error(e);
    }
  };

  const calculateAge = (birthday: string | null) => {
    if (!birthday) return null;
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = details ? calculateAge(details.birthday) : null;
  const displayedMovies = credits?.cast.slice(0, 12) || [];

  const isStatham = id === 976 || details?.id === 976 || details?.name.toLowerCase().includes('jason statham');

  const filteredQuotes = selectedCategory === 'all'
    ? STATHAM_QUOTES
    : STATHAM_QUOTES.filter(q => q.category === selectedCategory);

  const currentQuote = STATHAM_QUOTES[activeQuoteIndex];

  const handleRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * STATHAM_QUOTES.length);
    setActiveQuoteIndex(randomIndex);
  };

  const handleCopyQuote = (text: string) => {
    navigator.clipboard.writeText(`"${text}" — Джейсон Стетхем`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isDetailsLoading || isCreditsLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-96 gap-4">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-blue-500/20 border-t-blue-500"></div>
        <p className="text-sm text-slate-400 font-medium">Завантажуємо профіль актора...</p>
      </div>
    );
  }

  if (isDetailsError || !details) {
    return (
      <div className="text-center py-20 px-4 rounded-3xl bg-red-500/10 border border-red-500/20 text-red-300 max-w-md mx-auto my-8">
        <p className="text-xl font-bold mb-2">Помилка завантаження даних</p>
        <p className="text-sm text-red-400 mb-6">Не вдалося знайти профіль даного актора.</p>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" />
          <span>Повернутися назад</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between gap-4">
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад</span>
        </Button>

        {/* Favorite Toggle Button */}
        <Button
          variant={isFavorite ? 'primary' : 'secondary'}
          size="sm"
          onClick={toggleFavorite}
          className={`transition-all duration-300 ${
            isFavorite 
              ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/30 border-rose-400' 
              : ''
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : 'text-rose-400'}`} />
          <span>{isFavorite ? 'В обраному' : 'Додати в обране'}</span>
        </Button>
      </div>

      {/* STATHAM SPECIAL HEADER BANNER ("2 КАРТИ І 2 СТВОЛА") */}
      {isStatham && (
        <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 lock-stock-card border border-amber-500/40 shadow-2xl">
          <div className="absolute right-4 -bottom-6 text-[130px] text-amber-500/10 font-cinzel font-black select-none pointer-events-none">
            ♠ 🔫
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-cinzel font-bold tracking-wider">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                2 КАРТИ І 2 СТВОЛА • SPECIAL EDITION
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-mono">
                <Flame className="w-3.5 h-3.5 text-red-400" />
                ПАЦАНСЬКІ ЦИТАТИ 2010-Х
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-300 border border-yellow-500/20 text-xs font-mono">
                ID: 976
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-5xl font-black font-cinzel gold-gradient-text tracking-wide">
                  ДЖЕЙСОН СТЕТХЕМ
                </h1>
                <p className="text-amber-200/80 text-sm sm:text-base mt-1">
                  Легенда екшн-кіно, головний філософ 2010-х та володар двох стволів.
                </p>
              </div>
              <Button 
                variant="statham" 
                size="md" 
                onClick={handleRandomQuote}
                className="shrink-0"
              >
                <Dices className="w-4 h-4" />
                <span>ЗГЕНЕРУВАТИ БАЗУ 🎲</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN PROFILE CARD */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start rounded-3xl bg-slate-900/40 border border-white/10 p-6 sm:p-8 backdrop-blur-xl apple-glass">
        {/* Poster Image */}
        <div className="md:col-span-4 relative group">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-slate-800 aspect-[2/3]">
            <img
              src={details.profile_path ? `${imageBaseUrl}${details.profile_path}` : fallbackImage}
              alt={details.name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
          </div>
        </div>

        {/* Actor Bio Details */}
        <div className="md:col-span-8 space-y-6">
          {!isStatham && (
            <div>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
                {details.name}
              </h1>
              <p className="text-blue-400 text-sm font-medium mt-1">Професійний актор кіно</p>
            </div>
          )}

          {/* Stats & Metadata Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Дата народження</p>
                <p className="font-semibold text-slate-200">
                  {details.birthday || 'Невідомо'} 
                  {age !== null && <span className="text-blue-400 text-xs ml-1">({age} років)</span>}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Місце народження</p>
                <p className="font-semibold text-slate-200 truncate max-w-[180px]" title={details.place_of_birth || ''}>
                  {details.place_of_birth || 'Невідомо'}
                </p>
              </div>
            </div>
          </div>

          {/* Biography Section */}
          <div className="space-y-2 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
              <Film className="w-4 h-4 text-blue-400" />
              <span>Біографія</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed max-h-56 overflow-y-auto pr-2 text-justify">
              {details.biography || 'Інформація про біографію актора відсутня.'}
            </p>
          </div>
        </div>
      </div>

      {/* JASON STATHAM SPECIAL: 50 BOY QUOTES SHOWCASE */}
      {isStatham && (
        <div className="space-y-6 pt-6 border-t border-amber-500/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-2xl font-black font-cinzel gold-gradient-text flex items-center gap-2">
                <Quote className="w-6 h-6 text-amber-400" />
                <span>Пацанські цитати 2010-х від Стетхема</span>
              </h3>
              <p className="text-xs text-slate-400">
                Масив з 50 легендарних цитат у стилі "Карти, гроші, два стволи" (Pinterest & Khtulhu Top)
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              {[
                { id: 'all', label: `🃏 Всі (${STATHAM_QUOTES.length})` },
                { id: 'братство', label: '♠️ Братство' },
                { id: 'мудрість', label: '♣️ Мудрість' },
                { id: 'стволи', label: '🔫 Стволи' },
                { id: 'вовк', label: '🐺 Вовк ауф' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    selectedCategory === tab.id
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                      : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* FEATURED ACTIVE QUOTE CARD */}
          <div className="relative p-6 sm:p-10 rounded-3xl lock-stock-card border border-amber-500/40 shadow-2xl overflow-hidden group">
            <div className="absolute top-4 left-4 text-3xl text-amber-500/40 font-cinzel select-none">
              {currentQuote.cardSuit}
            </div>
            <div className="absolute bottom-4 right-4 text-3xl text-amber-500/40 font-cinzel select-none">
              {currentQuote.cardSuit}
            </div>

            <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono border border-amber-500/30">
                Цитата #{currentQuote.id} • {currentQuote.movieRef}
              </span>

              <blockquote className="text-xl sm:text-3xl font-extrabold text-amber-100 leading-snug font-sans tracking-wide italic">
                "{currentQuote.quote}"
              </blockquote>

              <div className="flex items-center justify-center gap-3 pt-2">
                <Button 
                  variant="statham" 
                  size="sm" 
                  onClick={handleRandomQuote}
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Випадкова цитата</span>
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleCopyQuote(currentQuote.quote)}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Скопійовано!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Скопіювати</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* ALL QUOTES GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredQuotes.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveQuoteIndex(STATHAM_QUOTES.findIndex(q => q.id === item.id))}
                className={`relative p-5 rounded-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                  currentQuote.id === item.id
                    ? 'bg-amber-950/60 border-amber-400 shadow-lg shadow-amber-500/20 scale-[1.02]'
                    : 'bg-slate-900/60 border-white/10 hover:border-amber-500/40 hover:bg-slate-900/90'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-amber-400/80 mb-2 font-mono">
                  <span className="font-cinzel text-base font-bold text-amber-400">
                    {item.cardSuit}
                  </span>
                  <span className="bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    {item.category}
                  </span>
                </div>

                <p className="text-sm font-semibold text-slate-200 leading-snug my-2 line-clamp-3">
                  "{item.quote}"
                </p>

                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="truncate max-w-[170px] text-amber-300/70">{item.movieRef}</span>
                  <Sparkles className="w-3 h-3 text-amber-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FILMOGRAPHY / KNOWN WORKS */}
      <div className="space-y-4 pt-6 border-t border-white/10">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span>Відомі роботи (Фільмографія)</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">Топ-{displayedMovies.length} фільмів</span>
        </div>

        {displayedMovies.length === 0 ? (
          <p className="text-sm text-slate-400">Інформація про роботи відсутня.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {displayedMovies.map((movie) => (
              <div 
                key={movie.id} 
                className="group flex flex-col rounded-xl bg-white/[0.02] border border-white/5 p-2 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="relative overflow-hidden rounded-lg aspect-[2/3] mb-2 bg-slate-800">
                  <img
                    src={movie.poster_path ? `${posterBaseUrl}${movie.poster_path}` : fallbackPoster}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <p className="font-bold text-xs text-slate-200 line-clamp-1 group-hover:text-blue-400 transition-colors">
                  {movie.title}
                </p>
                <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                  {movie.character || 'Самосебе'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
