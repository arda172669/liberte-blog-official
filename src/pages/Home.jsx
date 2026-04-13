import React from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import './Home.css';
import { articles, authors, categories, subcategories } from '../data/mockData';

const Home = () => {
  const ardaArticle = [...articles]
    .filter(article => article.authorId === 'arda')
    .sort((left, right) => right.id - left.id)[0];

  const recentArticlesData = [
    ardaArticle,
    ...[...articles]
      .filter(article => article.id !== ardaArticle?.id)
      .sort((left, right) => right.id - left.id)
      .slice(0, 2)
  ]
    .filter(Boolean);

  const featuredCategories = categories.map((category) => ({
    ...category,
    articleCount: articles.filter((article) => article.categoryId === category.id).length,
    subcategoryCount: subcategories.filter((subcategory) => subcategory.categoryId === category.id).length,
  }));

  return (
    <div className="home-page">
      <header className="home-header glass-panel">
        <div className="container text-center">
          <span className="topic-badge text-gold">Ana Sayfa</span>
          <h1 className="page-title">Özgürlük, İstisna Değil <span className="text-gold">Kuraldır.</span></h1>
          <p className="home-main-desc text-secondary">
            Liberte; ekonomi, felsefe, hukuk ve siyaset eksenindeki metinleri okunabilir bir akışla sunar.
            Son yazılara, kategorilere ve yazarlara tek yerden erişebilirsiniz.
          </p>

          <div className="home-actions" aria-label="Ana sayfa hızlı erişim bağlantıları">
            <Link to="/archive" className="btn btn-primary">Kategorileri İncele</Link>
            <Link to="/authors" className="btn">Yazarları Gör</Link>
          </div>
        </div>
      </header>

      <div className="container">
        <section className="home-overview glass-panel" aria-labelledby="home-overview-title">
          <h2 id="home-overview-title" className="feed-title">İçerik haritası</h2>
          <div className="home-overview-grid">
            <div className="home-overview-card">
              <span className="home-overview-label text-secondary">Kategori</span>
              <strong>{categories.length}</strong>
            </div>
            <div className="home-overview-card">
              <span className="home-overview-label text-secondary">Alt başlık</span>
              <strong>{subcategories.length}</strong>
            </div>
            <div className="home-overview-card">
              <span className="home-overview-label text-secondary">Yazar</span>
              <strong>{authors.length}</strong>
            </div>
            <div className="home-overview-card">
              <span className="home-overview-label text-secondary">Toplam yazı</span>
              <strong>{articles.length}</strong>
            </div>
          </div>
        </section>

        <section className="home-category-section" aria-labelledby="home-category-title">
          <h2 id="home-category-title" className="feed-title">Kategorilere göre keşfet</h2>
          <div className="home-category-grid">
            {featuredCategories.map((category) => (
              <article key={category.id} className="home-category-card glass-panel" aria-labelledby={`home-category-${category.id}`}>
                <div className="home-category-top">
                  <span className="subcategory-pill">Kategori</span>
                  <span className="home-category-count">{category.articleCount} yazı</span>
                </div>
                <h3 id={`home-category-${category.id}`} className="home-category-title">
                  <Link to={`/category/${category.id}`} className="home-category-link">
                    {category.title}
                  </Link>
                </h3>
                <p className="text-secondary home-category-desc">{category.shortDesc}</p>
                <p className="home-category-meta text-secondary">
                  {category.subcategoryCount} alt başlık ile derlenmiş içerik akışı
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-recent-section" aria-labelledby="recent-articles-title">
          <h2 id="recent-articles-title" className="feed-title">Son eklenen yazılar</h2>
          <div className="articles-grid" role="list">
            {recentArticlesData.map(article => (
              <div key={article.id} role="listitem">
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
