import React from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import './Home.css';
import { articles, authors } from '../data/mockData';

const Home = () => {
  const recentArticlesData = articles.slice(0, 3).map(a => {
    const author = authors.find(aut => aut.id === a.authorId);
    return { ...a, author: author ? author.name : 'Gizli Yazar' };
  });

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container hero-container text-center">
          <h1 className="hero-title">
            Özgürlük, İstisna Değil <span className="text-gold">Kuraldır.</span>
          </h1>
          <div className="hero-actions">
            <Link to="/archive" className="btn btn-primary">Kategorileri İncele</Link>
            <Link to="/authors" className="btn">Yazarlari Gor</Link>
          </div>
        </div>
      </section>

      <section className="recent-articles-section">
        <div className="container">
          <div className="section-header">
            <h2>Son Eklenen Yazılar</h2>
          </div>
          <div className="articles-grid">
            {recentArticlesData.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
