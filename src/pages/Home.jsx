import React from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import './Home.css';
import { articles, authors } from '../data/mockData';

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
    .filter(Boolean)
    .map(article => {
      const author = authors.find(aut => aut.id === article.authorId);
      return { ...article, author: author ? author.name : 'Gizli Yazar' };
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
