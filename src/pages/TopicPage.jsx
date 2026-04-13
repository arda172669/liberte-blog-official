import React from 'react';
import { useParams } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import './TopicPage.css';
import { categories, articles, authors, subcategories } from '../data/mockData';

const CategoryPage = () => {
  const { id } = useParams();
  const currentCategory = categories.find((category) => category.id === id) || categories[0];
  
  const categoryArticles = articles
    .filter((article) => article.categoryId === currentCategory.id)
    .map(a => {
      const subcategory = subcategories.find((item) => item.id === a.subcategoryId);

      return {
        ...a,
        subcategory,
      };
    });

  const categorySubgroups = subcategories
    .filter((subcategory) => subcategory.categoryId === currentCategory.id)
    .map((subcategory) => ({
      ...subcategory,
      articles: categoryArticles.filter((article) => article.subcategoryId === subcategory.id),
    }))
    .filter((subcategory) => subcategory.articles.length > 0);

  return (
    <div className="topic-page">
      <div className="topic-header glass-panel">
        <div className="container text-center">
          <span className="topic-badge text-gold">Kategori</span>
          <h1 className="page-title">{currentCategory.title}</h1>
          <p className="topic-main-desc text-secondary">
            {currentCategory.mainDesc}
          </p>
        </div>
      </div>

      <div className="container">
        <section className="subcategory-overview glass-panel">
          <h2 className="feed-title">Alt kategoriler</h2>
          <div className="subcategory-pill-group">
            {subcategories
              .filter((subcategory) => subcategory.categoryId === currentCategory.id)
              .map((subcategory) => (
                <span key={subcategory.id} className="subcategory-pill">
                  {subcategory.title}
                </span>
              ))}
          </div>
        </section>

        <div className="topic-feed">
          <h3 className="feed-title">Bu kategorideki yazılar ({categoryArticles.length})</h3>
          {categorySubgroups.map((subcategory) => (
            <section key={subcategory.id} className="subcategory-section">
              <div className="subcategory-section-header">
                <div>
                  <h4>{subcategory.title}</h4>
                  <p className="text-secondary">{subcategory.shortDesc}</p>
                </div>
                <span className="text-gold">{subcategory.articles.length} yazı</span>
              </div>
              <div className="articles-grid">
                {subcategory.articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
