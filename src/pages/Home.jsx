import React from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import './Home.css';
import { topics, articles, authors } from '../data/mockData';

const Home = () => {
  // Get recent 3 articles
  const recentArticlesData = articles.slice(0, 3).map(a => {
    const author = authors.find(aut => aut.id === a.authorId);
    return { ...a, author: author ? author.name : 'Gizli Yazar' };
  });

  // Featured topic is the first one (most recent week)
  const featuredTopic = topics[0];

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container hero-container text-center">
          <h1 className="hero-title">
            Özgürlük, İstisna Değil <span className="text-gold">Kuraldır.</span>
          </h1>
          <div className="hero-actions">
            <Link to={`/topic/${featuredTopic.id}`} className="btn btn-primary">Haftanın Konusu</Link>
            <Link to="/authors" className="btn">Yazarları Gör</Link>
          </div>
        </div>
      </section>

      <section className="featured-topic-section">
        <div className="container">
          <div className="glass-panel featured-topic-card text-center">
            <span className="topic-badge text-gold">Bu Haftanın Gündemi • {featuredTopic.dateRange}</span>
            <h2 className="topic-title">{featuredTopic.title}</h2>
            <p className="topic-desc text-secondary">
              {featuredTopic.desc}
            </p>
            <Link to={`/topic/${featuredTopic.id}`} className="btn btn-primary">Tüm Yazıları Oku</Link>
          </div>
        </div>
      </section>

      <section className="recent-articles-section">
        <div className="container">
          <div className="section-header">
            <h2>Son Eklenen Argümanlar</h2>
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
