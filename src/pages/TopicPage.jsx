import React from 'react';
import { useParams } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import './TopicPage.css';
import { topics, articles, authors } from '../data/mockData';

const TopicPage = () => {
  const { id } = useParams();
  const topicId = parseInt(id) || 42;
  const currentTopic = topics.find(t => t.id === topicId) || topics[0];
  
  // Filter articles for this topic, attach author info
  const topicArticles = articles
    .filter(a => a.topicId === currentTopic.id)
    .map(a => {
      const author = authors.find(aut => aut.id === a.authorId);
      return { ...a, author: author ? author.name : 'Gizli Yazar' };
    });

  return (
    <div className="topic-page">
      <div className="topic-header glass-panel">
        <div className="container text-center">
          <span className="topic-badge text-gold">Hafta #{currentTopic.id} • {currentTopic.dateRange}</span>
          <h1 className="page-title">{currentTopic.title}</h1>
          <p className="topic-main-desc text-secondary">
            {currentTopic.mainDesc}
          </p>
        </div>
      </div>

      <div className="container">
        <div className="topic-feed">
          <h3 className="feed-title">Akademik Argümanlar ({topicArticles.length})</h3>
          <div className="articles-grid">
            {topicArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicPage;
