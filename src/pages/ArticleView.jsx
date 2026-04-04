import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Share2, Heart } from 'lucide-react';
import './ArticleView.css';
import { articles, authors, topics } from '../data/mockData';

const ArticleView = () => {
  const { id } = useParams();
  const articleId = parseInt(id) || 4;
  
  const articleData = articles.find(a => a.id === articleId) || articles[0];
  const authorData = authors.find(a => a.id === articleData.authorId);
  const topicData = topics.find(t => t.id === articleData.topicId);

  return (
    <div className="article-view">
      <div className="container article-container">
        
        <Link to={`/topic/${topicData.id}`} className="back-link text-secondary hover-gold">
          <ArrowLeft size={18} /> Geri Dön
        </Link>
        
        <article className="article-main">
          <header className="article-header-section text-center">
            <span className="topic-badge text-gold">{topicData.title}</span>
            <h1 className="article-main-title">{articleData.title}</h1>
            <div className="article-meta text-secondary">
              <Link to={`/profile/${authorData.id}`} className="article-author-link hover-gold">{authorData.name}</Link>
              <span className="dot-separator">•</span>
              <span>{articleData.date}</span>
            </div>
          </header>

          <div className="article-body">
            {articleData.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('**')) {
                return <h3 key={idx} className="article-subheading">{paragraph.replace(/\*\*/g, '')}</h3>;
              }
              if (paragraph.startsWith('*')) {
                return <h4 key={idx} className="article-minor-heading">{paragraph.replace(/\*/g, '')}</h4>;
              }
              return <p key={idx}>{paragraph}</p>;
            })}
          </div>

          <footer className="article-footer-section glass-panel">
            <div className="article-actions">
               <button className="btn"><Heart size={18} /> Metodolojiyi Teyit Et (142 Atıf)</button>
               <button className="btn"><Share2 size={18} /> Tartışmayı Paylaş</button>
            </div>
          </footer>
        </article>

      </div>
    </div>
  );
};

export default ArticleView;
