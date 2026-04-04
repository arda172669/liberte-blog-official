import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Layers3 } from 'lucide-react';
import './AuthorsPage.css';
import { articles, authors, categories } from '../data/mockData';

const AuthorsPage = () => {
  const authorsWithStats = authors.map((author) => {
    const authorArticles = articles.filter((article) => article.authorId === author.id);
    const categoryCount = new Set(authorArticles.map((article) => article.categoryId)).size;
    const totalComments = authorArticles.reduce((sum, article) => sum + article.commentsCount, 0);

    return {
      ...author,
      articleCount: authorArticles.length,
      categoryCount,
      totalComments,
      latestArticle: authorArticles[0] ?? null,
    };
  });

  const totalArticleCount = articles.length;

  return (
    <div className="authors-page">
      <div className="container">
        <header className="authors-hero glass-panel">
          <div className="authors-hero-copy">
            <span className="topic-badge text-gold">Yazarlar</span>
            <h1 className="page-title">Yazarlar</h1>
            <p className="authors-intro text-secondary">
              Sitedeki metinleri ureten yazarlar, odaklandiklari alanlar ve son katkilarini burada bulabilirsiniz.
            </p>
          </div>

          <div className="authors-overview">
            <div className="overview-card">
              <span className="overview-label text-secondary">Aktif Yazar</span>
              <strong>{authors.length}</strong>
            </div>
            <div className="overview-card">
              <span className="overview-label text-secondary">Toplam Yazı</span>
              <strong>{totalArticleCount}</strong>
            </div>
            <div className="overview-card">
              <span className="overview-label text-secondary">Kategori</span>
              <strong>{categories.length}</strong>
            </div>
          </div>
        </header>

        <section className="authors-grid">
          {authorsWithStats.map((author) => (
            <article key={author.id} className="author-card glass-panel">
              <div className="author-card-top">
                <div className="author-card-avatar">
                  {author.name.split(' ').pop()?.charAt(0) || 'Y'}
                </div>
                <div>
                  <h2 className="author-card-name">{author.name}</h2>
                  <p className="author-card-meta text-secondary">
                    {author.categoryCount} kategori • {author.articleCount} yayın
                  </p>
                </div>
              </div>

              <p className="author-card-bio text-secondary">{author.bio}</p>

              <div className="author-card-stats">
                <div className="author-stat">
                  <FileText size={16} />
                  <span>{author.articleCount} metin</span>
                </div>
                <div className="author-stat">
                  <Layers3 size={16} />
                  <span>{author.totalComments} yorum</span>
                </div>
              </div>

              <div className="author-card-highlight">
                <span className="highlight-label text-gold">Son katkı</span>
                <p>{author.latestArticle ? author.latestArticle.title : 'Henüz yayın yok'}</p>
              </div>

              <Link to={`/profile/${author.id}`} className="author-card-link">
                Profili İncele <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
};

export default AuthorsPage;
