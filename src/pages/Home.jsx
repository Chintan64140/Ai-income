import { Link, useSearchParams } from "react-router-dom";
import { articles } from "../data/articles.js";
import ArticleCard from "../components/ArticleCard.jsx";
import AdsensePlaceholder from "../components/AdsensePlaceholder.jsx";
import { useEffect, useState } from "react";

function Home() {
  const featured = articles[0];
  const others = articles.slice(1);

  return (
    <div
      className="page"
      style={{
        position: "relative",
      }}
    >
      <section
        className="hero"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521791136064-7986c2920216')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            borderRadius: "12px",
            padding: "2px 21px 25px",
            background: "#01031cd9",
          }}
        >
          <h1>Protect What Matters. Plan Smarter. Live Secure.</h1>
          <p>
            Your trusted guide to health, life, travel, auto, and family
            insurance. Compare plans, understand coverage, and make confident
            financial decisions for a safer future.
          </p>
          <div className="flex flex-row sm:flex-col md:flex-col  gap-4 hero-actions">
            <Link to="/articles" className="btn-primary">
              Explore Insurance Guides
            </Link>
            <Link to="/about" className="btn-secondary">
              About This Platform
            </Link>
          </div>
        </div>
      </section>

      <AdsensePlaceholder type="banner" />

      <section className="section">
        <h2>Featured Guide</h2>
        {featured && <ArticleCard article={featured} />}
      </section>

      <section className="section">
        <h2>Latest Articles</h2>
        <div className="articles-grid">
          {others.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <AdsensePlaceholder type="rectangle" />
    </div>
  );
}

export default Home;
