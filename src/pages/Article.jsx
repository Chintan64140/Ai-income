import { useParams } from "react-router-dom";
import { articles } from "../data/articles.js";
import AdsensePlaceholder from "../components/AdsensePlaceholder.jsx";
import { marked } from "marked";

function Article() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="page">
        <h1>Article not found</h1>
        <p>The article you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <article className="single-article">
        <h1>{article.title}</h1>
        <p className="article-meta">
          {article.category} · {article.readTime} min read
        </p>

        <AdsensePlaceholder type="banner" />

        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: marked.parse(article.content) }}
        />

        <AdsensePlaceholder type="rectangle" />
      </article>
    </div>
  );
}

export default Article;
