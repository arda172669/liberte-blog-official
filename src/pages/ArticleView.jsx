import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Share2, ThumbsDown, ThumbsUp } from 'lucide-react';
import './ArticleView.css';
import { articles, authors, categories, subcategories } from '../data/mockData';

const ArticleView = () => {
  const { id } = useParams();
  const location = useLocation();
  const articleId = parseInt(id) || 4;

  const articleData = articles.find(a => a.id === articleId) || articles[0];
  const authorData = authors.find(a => a.id === articleData.authorId);
  const categoryData = categories.find((category) => category.id === articleData.categoryId) || categories[0];
  const subcategoryData = subcategories.find((subcategory) => subcategory.id === articleData.subcategoryId);
  const storageKey = `article-reaction-${articleData.id}`;
  const [reaction, setReaction] = useState(null);
  const [shareState, setShareState] = useState('idle');

  useEffect(() => {
    const storedReaction = window.localStorage.getItem(storageKey);
    setReaction(storedReaction === 'like' || storedReaction === 'dislike' ? storedReaction : null);
  }, [storageKey]);

  useEffect(() => {
    if (reaction) {
      window.localStorage.setItem(storageKey, reaction);
      return;
    }

    window.localStorage.removeItem(storageKey);
  }, [reaction, storageKey]);

  useEffect(() => {
    if (shareState !== 'copied') {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setShareState('idle');
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [shareState]);

  const shareUrl = `${window.location.origin}${location.pathname}`;
  const likeCount = reaction === 'like' ? 1 : 0;
  const dislikeCount = reaction === 'dislike' ? 1 : 0;

  const handleReaction = (nextReaction) => {
    setReaction((currentReaction) => (currentReaction === nextReaction ? null : nextReaction));
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: articleData.title,
          text: `${categoryData.title} kategorisindeki bu yazıya göz at`,
          url: shareUrl,
        });
        setShareState('shared');
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      setShareState('copied');
    } catch {
      setShareState('ready');
    }
  };

  return (
    <div className="article-view">
      <div className="container article-container">
        <Link to={`/category/${categoryData.id}`} className="back-link text-secondary hover-gold">
          <ArrowLeft size={18} /> Geri Dön
        </Link>

        <article className="article-main">
          <header className="article-header-section text-center">
            <span className="topic-badge text-gold">{categoryData.title}</span>
            {subcategoryData && <div className="article-id-badge">{subcategoryData.title}</div>}
            <div className="article-id-badge">Yazı ID #{articleData.id}</div>
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
              <button
                type="button"
                className={`btn reaction-btn ${reaction === 'like' ? 'is-active' : ''}`}
                onClick={() => handleReaction('like')}
                aria-pressed={reaction === 'like'}
              >
                <ThumbsUp size={18} /> Beğen ({likeCount})
              </button>
              <button
                type="button"
                className={`btn reaction-btn ${reaction === 'dislike' ? 'is-active dislike-active' : ''}`}
                onClick={() => handleReaction('dislike')}
                aria-pressed={reaction === 'dislike'}
              >
                <ThumbsDown size={18} /> Katılmıyorum ({dislikeCount})
              </button>
              <button type="button" className="btn" onClick={handleShare}>
                <Share2 size={18} /> Tartışmayı Paylaş
              </button>
            </div>

            <div className="share-panel">
              <span className="share-label text-secondary">Tartışma linki</span>
              <a href={shareUrl} className="share-link" target="_blank" rel="noreferrer">
                {shareUrl}
              </a>
              <span className="share-status text-secondary">
                {shareState === 'copied' && 'Link kopyalandı.'}
                {shareState === 'shared' && 'Paylaşım penceresi açıldı.'}
                {shareState === 'ready' && 'Kopyalama engellendi; link burada hazır.'}
              </span>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default ArticleView;
