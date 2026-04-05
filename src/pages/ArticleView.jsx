import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Share2, ThumbsDown, ThumbsUp } from 'lucide-react';
import './ArticleView.css';
import { articles, authors, categories, subcategories } from '../data/mockData';

const getVisitorId = () => {
  const storageKey = 'liberte-visitor-id';
  const existingId = window.localStorage.getItem(storageKey);

  if (existingId) {
    return existingId;
  }

  const nextId = window.crypto?.randomUUID?.() || `visitor-${Date.now()}`;
  window.localStorage.setItem(storageKey, nextId);
  return nextId;
};

const ArticleView = () => {
  const { id } = useParams();
  const location = useLocation();
  const articleId = parseInt(id) || 4;

  const articleData = articles.find(a => a.id === articleId) || articles[0];
  const authorData = authors.find(a => a.id === articleData.authorId);
  const categoryData = categories.find((category) => category.id === articleData.categoryId) || categories[0];
  const subcategoryData = subcategories.find((subcategory) => subcategory.id === articleData.subcategoryId);
  const [reaction, setReaction] = useState(null);
  const [counts, setCounts] = useState({ like: 0, dislike: 0 });
  const [reactionState, setReactionState] = useState('loading');
  const [reactionMessage, setReactionMessage] = useState('');
  const [shareState, setShareState] = useState('idle');

  useEffect(() => {
    let isCancelled = false;

    const loadReactions = async () => {
      try {
        const visitorId = getVisitorId();
        const response = await fetch(`/api/reactions/${articleData.id}?visitorId=${encodeURIComponent(visitorId)}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Reaction data could not be loaded.');
        }

        if (isCancelled) {
          return;
        }

        setCounts(data.counts ?? { like: 0, dislike: 0 });
        setReaction(data.reaction ?? null);
        setReactionState('ready');
        setReactionMessage('');
      } catch (error) {
        if (isCancelled) {
          return;
        }

        setReactionState('error');
        setReactionMessage(
          'Oy sistemi henuz baglanamadi. Vercel tarafinda KV ayarlari tamamlaninca herkese acik calisacak.'
        );
      }
    };

    loadReactions();

    return () => {
      isCancelled = true;
    };
  }, [articleData.id]);

  useEffect(() => {
    if (shareState !== 'copied') {
      return;
    }

    const timer = window.setTimeout(() => {
      setShareState('idle');
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [shareState]);

  const shareUrl = `${window.location.origin}${location.pathname}`;

  const handleReaction = async (nextReaction) => {
    if (reactionState === 'loading' || reactionState === 'saving') {
      return;
    }

    try {
      setReactionState('saving');
      setReactionMessage('');

      const response = await fetch(`/api/reactions/${articleData.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          visitorId: getVisitorId(),
          reaction: nextReaction,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Reaction could not be saved.');
      }

      setCounts(data.counts ?? { like: 0, dislike: 0 });
      setReaction(data.reaction ?? null);
      setReactionState('ready');
    } catch (error) {
      setReactionState('error');
      setReactionMessage(
        'Oy kaydi su an tamamlanamadi. Vercel KV ayarlari eksikse once onu baglamamiz gerekecek.'
      );
    }
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
            <div className="article-taxonomy">
              <Link to={`/category/${categoryData.id}`} className="topic-badge article-category-link text-gold">
                {categoryData.title}
              </Link>
              {subcategoryData && <span className="article-id-badge">{subcategoryData.title}</span>}
              <span className="article-id-badge article-id-pill">Yazı ID #{articleData.id}</span>
            </div>
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
                disabled={reactionState === 'loading' || reactionState === 'saving'}
              >
                <ThumbsUp size={18} /> Begen ({counts.like})
              </button>
              <button
                type="button"
                className={`btn reaction-btn ${reaction === 'dislike' ? 'is-active dislike-active' : ''}`}
                onClick={() => handleReaction('dislike')}
                aria-pressed={reaction === 'dislike'}
                disabled={reactionState === 'loading' || reactionState === 'saving'}
              >
                <ThumbsDown size={18} /> Katilmiyorum ({counts.dislike})
              </button>
              <button type="button" className="btn" onClick={handleShare}>
                <Share2 size={18} /> Tartismayi Paylas
              </button>
            </div>

            <div className="reaction-note text-secondary">
              {reactionState === 'loading' && 'Oylar yukleniyor...'}
              {reactionState === 'saving' && 'Oyun kaydediliyor...'}
              {reactionState === 'ready' && reaction && 'Oyun kaydedildi ve herkese ortak sayaca islendi.'}
              {reactionMessage}
            </div>

            <div className="share-panel">
              <span className="share-label text-secondary">Tartisma linki</span>
              <a href={shareUrl} className="share-link" target="_blank" rel="noreferrer">
                {shareUrl}
              </a>
              <span className="share-status text-secondary">
                {shareState === 'copied' && 'Link kopyalandi.'}
                {shareState === 'shared' && 'Paylasim penceresi acildi.'}
                {shareState === 'ready' && 'Kopyalama engellendi; link burada hazir.'}
              </span>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default ArticleView;
