import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './ArticleCard.css';
import wertfreiheitAvatar from '../assets/foto.jpeg';
import { authors } from '../data/mockData';

const ArticleCard = ({ article }) => {
  const authorInfo = authors.find(aut => aut.id === article.authorId) || { name: 'Gizli Yazar' };

  return (
    <article className="article-card glass-panel">
      <div className="article-header">
        <div className="author-info">
          <div className="author-avatar">
            {authorInfo.avatar === 'wertfreiheit-avatar' ? (
              <img src={wertfreiheitAvatar} alt={authorInfo.name} className="author-avatar-card-img" />
            ) : (
              (authorInfo.name || 'G').charAt(0)
            )}
          </div>
          <div className="author-meta">
            <Link to={`/profile/${article.authorId}`} className="author-name hover-gold">{authorInfo.name}</Link>
            <span className="article-date">{article.date}</span>
          </div>
        </div>
      </div>
      <div className="article-content">
        <span className="article-id text-gold">Yazı ID #{article.id}</span>
        <Link to={`/article/${article.id}`}>
          <h3 className="article-title ">{article.title}</h3>
        </Link>
        <p className="article-excerpt text-secondary">{article.excerpt}</p>
      </div>
      <div className="article-footer">
        <Link to={`/article/${article.id}`} className="read-more cursor-pointer">
          Devamını Oku <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
};

export default ArticleCard;
