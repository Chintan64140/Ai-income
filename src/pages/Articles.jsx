import { useState } from "react";
import { articles } from "../data/articles.js";
import ArticleCard from "../components/ArticleCard.jsx";
import AdsensePlaceholder from "../components/AdsensePlaceholder.jsx";

function Articles() {
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(4);

  const filtered = articles.filter((article) =>
    article.title.toLowerCase().includes(query.toLowerCase())
  );

  const visible = filtered.slice(0, limit);

  const loadMore = () => {
    setLimit((prev) => prev + 4);
  };

  return (
    <div className="page">
      <section className="section">
        <h1>All Articles</h1>
        <input
          type="text"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-bar"
        />
      </section>

      <section className="section">
        <div className="articles-grid">
          {visible.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        {visible.length < filtered.length && (
          <button className="load-more-btn" onClick={loadMore}>
            Load More Articles
          </button>
        )}
      </section>
    </div>
  );
}

export default Articles;
