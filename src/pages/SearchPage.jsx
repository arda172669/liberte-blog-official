import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Layers3, Search, UserRound } from 'lucide-react';
import ArticleCard from '../components/ArticleCard';
import './SearchPage.css';
import { articles, authors, categories, subcategories } from '../data/mockData';

const normalize = (value) =>
  value
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const scoreMatch = (query, value, weight) => {
  if (!value) {
    return 0;
  }

  const normalizedValue = normalize(value);

  if (normalizedValue === query) {
    return weight * 5;
  }

  if (normalizedValue.startsWith(query)) {
    return weight * 3;
  }

  if (normalizedValue.includes(query)) {
    return weight;
  }

  return 0;
};

const sortByScore = (items) =>
  items
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score);

const SearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = (searchParams.get('q') || '').trim();
  const normalizedQuery = normalize(query);

  const articlesWithMeta = articles.map((article) => {
    const author = authors.find((item) => item.id === article.authorId);
    const category = categories.find((item) => item.id === article.categoryId);
    const subcategory = subcategories.find((item) => item.id === article.subcategoryId);

    return {
      ...article,
      author: author ? author.name : 'Gizli Yazar',
      category,
      subcategory,
    };
  });

  const filteredArticles = normalizedQuery
    ? sortByScore(
        articlesWithMeta.map((article) => ({
          ...article,
          score:
            scoreMatch(normalizedQuery, article.title, 12) +
            scoreMatch(normalizedQuery, article.author, 8) +
            scoreMatch(normalizedQuery, article.category?.title, 7) +
            scoreMatch(normalizedQuery, article.subcategory?.title, 6) +
            scoreMatch(normalizedQuery, article.excerpt, 4) +
            scoreMatch(normalizedQuery, article.content, 2),
        }))
      )
    : [];

  const filteredCategories = normalizedQuery
    ? sortByScore(
        categories.map((category) => ({
          ...category,
          score:
            scoreMatch(normalizedQuery, category.title, 12) +
            scoreMatch(normalizedQuery, category.shortDesc, 5) +
            scoreMatch(normalizedQuery, category.desc, 4) +
            scoreMatch(normalizedQuery, category.mainDesc, 2) +
            subcategories
              .filter((subcategory) => subcategory.categoryId === category.id)
              .reduce(
                (total, subcategory) =>
                  total + scoreMatch(normalizedQuery, subcategory.title, 5),
                0
              ),
        }))
      )
    : [];

  const filteredAuthors = normalizedQuery
    ? sortByScore(
        authors.map((author) => ({
          ...author,
          score:
            scoreMatch(normalizedQuery, author.name, 12) +
            scoreMatch(normalizedQuery, author.bio, 4),
        }))
      )
    : [];

  const totalResults =
    filteredArticles.length + filteredCategories.length + filteredAuthors.length;

  return (
    <div className="search-page">
      <div className="container">
        <header className="search-hero glass-panel">
          <span className="topic-badge text-gold">Site İçi Arama</span>
          <h1 className="page-title">Arama Sonuçları</h1>
          <p className="search-summary text-secondary">
            {query
              ? `"${query}" için ${totalResults} sonuç bulundu.`
              : 'Makale, konu başlığı veya yazar adı aramak için üst çubuktaki aramayı kullanın.'}
          </p>
        </header>

        {!query && (
          <section className="search-empty glass-panel">
            <Search size={26} className="text-gold" />
            <div>
              <h2>Ne aramak istersiniz?</h2>
              <p className="text-secondary">
                Örneğin bir kategori adı, yazar adı veya makale içindeki bir kavram yazabilirsiniz.
              </p>
            </div>
          </section>
        )}

        {query && totalResults === 0 && (
          <section className="search-empty glass-panel">
            <Search size={26} className="text-gold" />
            <div>
              <h2>Sonuç bulunamadı</h2>
              <p className="text-secondary">
                Yazımı değiştirip yeniden deneyebilir veya daha genel bir ifade kullanabilirsiniz.
              </p>
            </div>
          </section>
        )}

        {filteredArticles.length > 0 && (
          <section className="search-section">
            <div className="search-section-header">
              <h2>Makaleler</h2>
              <span className="text-secondary">{filteredArticles.length} sonuç</span>
            </div>
            <div className="articles-grid">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        )}

        {filteredCategories.length > 0 && (
          <section className="search-section">
            <div className="search-section-header">
              <h2>Kategoriler</h2>
              <span className="text-secondary">{filteredCategories.length} sonuç</span>
            </div>
            <div className="search-topic-grid">
              {filteredCategories.map((category) => (
                <article key={category.id} className="search-topic-card glass-panel">
                  <div className="search-card-icon">
                    <Layers3 size={18} />
                  </div>
                  <span className="topic-badge text-gold">Kategori</span>
                  <h3>{category.title}</h3>
                  <p className="text-secondary">{category.shortDesc}</p>
                  <div className="search-pill-row">
                    {subcategories
                      .filter((subcategory) => subcategory.categoryId === category.id)
                      .map((subcategory) => (
                        <span key={subcategory.id} className="search-pill">
                          {subcategory.title}
                        </span>
                      ))}
                  </div>
                  <Link to={`/category/${category.id}`} className="search-card-link">
                    Kategoriyi Aç
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

        {filteredAuthors.length > 0 && (
          <section className="search-section">
            <div className="search-section-header">
              <h2>Yazarlar</h2>
              <span className="text-secondary">{filteredAuthors.length} sonuç</span>
            </div>
            <div className="search-author-grid">
              {filteredAuthors.map((author) => {
                const authorArticleCount = articles.filter((article) => article.authorId === author.id).length;

                return (
                  <article key={author.id} className="search-author-card glass-panel">
                    <div className="search-card-icon">
                      <UserRound size={18} />
                    </div>
                    <h3>{author.name}</h3>
                    <p className="text-secondary">{author.bio}</p>
                    <div className="search-card-meta text-secondary">
                      <FileText size={16} />
                      <span>{authorArticleCount} yayın</span>
                    </div>
                    <Link to={`/profile/${author.id}`} className="search-card-link">
                      Profili Gör
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
