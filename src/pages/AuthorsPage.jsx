import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Layers3 } from 'lucide-react';
import './AuthorsPage.css';
import { articles, authors, categories, subcategories } from '../data/mockData';
import ardaAvatar from '../assets/foto.jpeg';

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
      <header className="authors-header glass-panel">
        <div className="container text-center">
          <span className="topic-badge text-gold">Yazarlar</span>
          <h1 className="page-title">Yazarlar</h1>
          <p className="authors-main-desc text-secondary">
            Sitedeki metinleri üreten yazarları, odaklandıkları alanları ve son katkılarını
            kategori sayfalarıyla aynı okunabilir düzende inceleyebilirsiniz.
          </p>
        </div>
      </header>

      <div className="container">
        <section className="authors-overview glass-panel" aria-labelledby="authors-overview-title">
          <h2 id="authors-overview-title" className="feed-title">Yazar özeti</h2>
          <div className="authors-overview-grid">
            <div className="overview-card">
              <span className="overview-label text-secondary">Aktif yazar</span>
              <strong>{authors.length}</strong>
            </div>
            <div className="overview-card">
              <span className="overview-label text-secondary">Toplam yazı</span>
              <strong>{totalArticleCount}</strong>
            </div>
            <div className="overview-card">
              <span className="overview-label text-secondary">Kategori</span>
              <strong>{categories.length}</strong>
            </div>
            <div className="overview-card">
              <span className="overview-label text-secondary">Alt başlık</span>
              <strong>{subcategories.length}</strong>
            </div>
          </div>
        </section>

        <section className="authors-grid-section" aria-labelledby="authors-grid-title">
          <h2 id="authors-grid-title" className="feed-title">Yazar profilleri</h2>
          <div className="authors-grid" role="list">
            {authorsWithStats.map((author) => (
              <article key={author.id} className="author-card glass-panel" role="listitem" aria-labelledby={`author-name-${author.id}`}>
                <div className="author-card-top">
                  <Link to={`/profile/${author.id}`} className="author-card-avatar-link" aria-hidden="true">
                    <div className="author-card-avatar">
                      {author.avatar === 'arda-avatar' ? (
                        <img src={ardaAvatar} alt={author.name} className="author-avatar-img" />
                      ) : (
                        author.name.split(' ').pop()?.charAt(0) || 'Y'
                      )}
                    </div>
                  </Link>
                  <div>
                    <h3 id={`author-name-${author.id}`} className="author-card-name">
                      <Link to={`/profile/${author.id}`} className="hover-gold">
                        {author.name}
                      </Link>
                    </h3>
                    <p className="author-card-meta text-secondary">
                      {author.categoryCount} kategori • {author.articleCount} yayın
                    </p>
                  </div>
                </div>

                <p className="author-card-bio text-secondary">{author.bio}</p>

                <div className="author-card-stats" aria-label={`${author.name} istatistikleri`}>
                  <div className="author-stat">
                    <FileText size={16} aria-hidden="true" />
                    <span>{author.articleCount} metin</span>
                  </div>
                  <div className="author-stat">
                    <Layers3 size={16} aria-hidden="true" />
                    <span>{author.totalComments} yorum</span>
                  </div>
                </div>

                <div className="author-card-highlight" aria-labelledby={`author-latest-${author.id}`}>
                  <span id={`author-latest-${author.id}`} className="highlight-label text-gold">Son katkı</span>
                  <p>{author.latestArticle ? author.latestArticle.title : 'Henüz yayın yok'}</p>
                </div>

                <Link
                  to={`/profile/${author.id}`}
                  className="author-card-link"
                  aria-label={`${author.name} profilini incele`}
                >
                  Profili İncele <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthorsPage;
