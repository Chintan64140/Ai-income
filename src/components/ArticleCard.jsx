import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  return (
    <article className="article-card">
      <h2>
        <a href={`/article/${article.slug}`}>{article.title}</a>
      </h2>
      <p className="article-meta">
        {article.category} · {article.readTime} min read
      </p>
      <p className="article-excerpt">{article.excerpt}</p>
      <a href={`/article/${article.slug}`} className="btn-link">
        Read full guide →
      </a>
    </article>
  );
}

export default ArticleCard;
