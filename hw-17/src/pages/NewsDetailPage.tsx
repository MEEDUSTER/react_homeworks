import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { type NewsItem } from "../mocks/db";
import { Spinner } from "../components/Spinner";

export const NewsDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setIsNotFound(false);
    setError(null);

    fetch(`/api/news/${id}`)
      .then((res) => {
        if (res.status === 404) {
          setIsNotFound(true);
          return null;
        }
        if (!res.ok) throw new Error("Помилка завантаження новини");
        return res.json();
      })
      .then((data) => {
        if (data) setNews(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;

  if (isNotFound) {
    return (
      <div className="article-shell mx-auto max-w-lg px-8 py-16 text-center">
        <p className="font-mono text-[11px] tracking-[0.2em] text-brass uppercase">
          Помилка
        </p>
        <h2 className="font-display mt-2 text-5xl font-semibold text-[#f2eee4]">404</h2>
        <p className="mt-4 mb-8 text-steel">
          Запитуваної новини не існує або її було видалено.
        </p>
        <Link to="/" className="btn-cyber">
          Повернутися на головну
        </Link>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="py-16 text-center font-medium text-alert">
        {error || "Сталася помилка"}
      </div>
    );
  }

  const formattedDate = new Date(news.createdAt).toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="article-shell mx-auto max-w-3xl overflow-hidden">
      <img
        src={news.imageUrl}
        alt={news.title}
        className="h-72 w-full object-cover sm:h-96"
      />
      <div className="p-6 sm:p-10">
        <Link
          to="/"
          className="link-arrow mb-6 inline-flex items-center"
        >
          ← Назад до новин
        </Link>

        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
          <span className="badge">{news.category}</span>
          <span className="text-steel/40">•</span>
          <span className="font-mono text-[11px] text-steel">{formattedDate}</span>
          <span className="text-steel/40">•</span>
          <span className="text-sm text-steel">Автор: {news.author}</span>
        </div>

        <h1 className="font-display mb-8 text-2xl font-semibold tracking-tight text-[#f2eee4] sm:text-4xl sm:leading-tight">
          {news.title}
        </h1>

        <div className="space-y-4 text-base leading-8 text-[#d8d3c6] sm:text-lg">
          {news.content.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
};
