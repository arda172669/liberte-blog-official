import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare } from 'lucide-react';
import './ArticleCard.css';


const ArticleCard = ({ article }) => {
  return (
    <article className="article-card glass-panel">
      <div className="article-header">
        <div className="author-info">
          <div className="author-avatar">{article.author.charAt(0)}</div>
          <div className="author-meta">
            <Link to={`/profile/${article.authorId}`} className="author-name hover-gold">{article.author}</Link>
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
        <div className="article-stats text-secondary cursor-pointer hover-gold">
           <MessageSquare size={16}/> {article.commentsCount}
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
