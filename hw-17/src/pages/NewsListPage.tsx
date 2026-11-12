import { useEffect, useState } from "react";
import { type NewsItem } from "../mocks/db";
import { NewsCard } from "../components/NewsCard";
import { Spinner } from "../components/Spinner";

export const NewsListPage = () => {
  const [newsList, setNewsList] = useState<Omit<NewsItem, "content">[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/news")
      .then((res) => {
        if (!res.ok) throw new Error("Помилка завантаження новин");
        return res.json();
      })
      .then((data) => setNewsList(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  if (error) {
    return (
      <div className="py-16 text-center font-medium text-alert">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <p className="mb-2 font-mono text-[11px] tracking-[0.2em] text-brass uppercase">
          Стрічка
        </p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-[#f2eee4] sm:text-4xl">
          Останні новини
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {newsList.map((news, index) => (
          <NewsCard key={news.id} news={news} featured={index === 0} />
        ))}
      </div>
    </div>
  );
};
