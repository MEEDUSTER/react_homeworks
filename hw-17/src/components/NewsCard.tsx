import { Link } from "react-router-dom";
import { type NewsItem } from "../mocks/db";

interface NewsCardProps {
  news: Omit<NewsItem, "content">;
  featured?: boolean;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news, featured = false }) => {
  const formattedDate = new Date(news.createdAt).toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className={`news-card ${featured ? "featured" : ""}`}>
      <img
        src={news.imageUrl}
        alt={news.title}
        className="news-card-image"
      />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="badge">{news.category}</span>
          <span className="font-mono text-[11px] text-steel">{formattedDate}</span>
        </div>
        <h2
          className={`mb-2 font-display font-semibold tracking-tight text-[#f2eee4] ${
            featured ? "text-2xl sm:text-3xl" : "text-lg"
          }`}
        >
          {news.title}
        </h2>
        <p className="mb-5 flex-1 text-sm leading-relaxed text-steel line-clamp-3">
          {news.summary}
        </p>
        <Link to={`/news/${news.id}`} className="link-arrow mt-auto">
          Читати далі →
        </Link>
      </div>
    </article>
  );
};
