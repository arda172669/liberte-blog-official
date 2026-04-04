import React from 'react';
import { useParams } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import './AuthorProfile.css';
import { authors, articles, topics } from '../data/mockData';

const AuthorProfile = () => {
  const { id } = useParams();
  
  const currentAuthor = authors.find(a => a.id === id) || authors[0];
  
  // Get articles for this author and attach topic data
  const authorArticles = articles
    .filter(a => a.authorId === currentAuthor.id)
    .map(a => {
       const topicInfo = topics.find(t => t.id === a.topicId);
       return { ...a, author: currentAuthor.name, topic: topicInfo };
    });

  return (
    <div className="author-profile">
      <div className="container">
        <div className="author-header glass-panel">
          <div className="author-avatar-large">{currentAuthor.name.split(' ').pop()?.charAt(0) || 'Y'}</div>
          <div className="author-details">
            <h1>{currentAuthor.name}</h1>
            <p className="author-bio text-secondary">
              {currentAuthor.bio}
            </p>
            <div className="author-stats text-gold">
              <span>{authorArticles.length} Akademik Argüman</span>
              <span className="dot-separator">•</span>
              <span>1.2k Atıf / Okunma</span>
            </div>
          </div>
        </div>

        <div className="author-articles">
          <div className="section-header">
            <h2>Akademik Yayınları</h2>
          </div>
          <div className="articles-grid">
            {authorArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;
