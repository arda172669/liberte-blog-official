import React from 'react';
import { Link } from 'react-router-dom';
import './ArchivePage.css';
import { articles, categories, subcategories } from '../data/mockData';

const ArchivePage = () => {
  return (
    <div className="archive-page">
      <div className="container">
        <header className="archive-header text-center">
          <h1 className="page-title  ">Kategoriler</h1>
          <p className="text-secondary max-w-700">
            Yazıları düşünsel eksenlerine göre ayıran ana başlıklar. Her kategori kendi içinde ilgili metinleri toplar.
          </p>
          <div className="archive-overview glass-panel" aria-label="Kategori genel özeti">
            <div className="archive-overview-item">
              <strong className="archive-overview-value">{categories.length}</strong>
              <span className="archive-overview-label text-secondary">ana kategori</span>
            </div>
            <div className="archive-overview-item">
              <strong className="archive-overview-value">{subcategories.length}</strong>
              <span className="archive-overview-label text-secondary">alt başlık</span>
            </div>
            <div className="archive-overview-item">
              <strong className="archive-overview-value">{articles.length}</strong>
              <span className="archive-overview-label text-secondary">toplam yazı</span>
            </div>
          </div>
        </header>

        <section className="archive-timeline" aria-label="Kategori listesi">
          {categories.map((category) => {
            const categoryArticles = articles.filter((article) => article.categoryId === category.id);
            const categorySubcategories = subcategories.filter(
              (subcategory) => subcategory.categoryId === category.id
            );

            return (
              <article
                key={category.id}
                className="archive-card glass-panel"
                aria-labelledby={`archive-card-title-${category.id}`}
              >
                <div className="archive-card-top">
                  <span className="archive-card-meta">Kategori</span>
                  <span className="archive-card-count" aria-label={`${categoryArticles.length} yazı`}>
                    {categoryArticles.length} yazı
                  </span>
                </div>

                <h2 className="archive-card-title">
                  <Link
                    to={`/category/${category.id}`}
                    className="archive-card-title-link"
                    id={`archive-card-title-${category.id}`}
                    aria-describedby={`archive-card-desc-${category.id}`}
                  >
                    {category.title}
                  </Link>
                </h2>

                <p id={`archive-card-desc-${category.id}`} className="archive-card-desc">
                  {category.shortDesc}
                </p>

                <div
                  className="archive-subcategory-group"
                  aria-labelledby={`archive-subcategory-label-${category.id}`}
                >
                  <p
                    id={`archive-subcategory-label-${category.id}`}
                    className="archive-subcategory-label"
                  >
                    Alt başlıklar
                  </p>
                  <ul className="archive-subcategory-list" aria-label={`${category.title} alt kategorileri`}>
                    {categorySubcategories.map((subcategory) => (
                      <li key={subcategory.id} className="archive-subcategory-pill">
                        {subcategory.title}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="archive-card-footer">
                  <Link
                    to={`/category/${category.id}`}
                    className="btn archive-card-button"
                    aria-label={`${category.title} kategorisini aç`}
                  >
                    Kategoriyi Aç
                  </Link>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default ArchivePage;
