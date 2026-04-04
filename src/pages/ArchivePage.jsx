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
        </header>

        <div className="archive-timeline">
          {categories.map((category) => (
            <div key={category.id} className="archive-card glass-panel">
              <div className="archive-card-meta text-gold">
                {articles.filter((article) => article.categoryId === category.id).length} yazı
              </div>
              <h2 className="archive-card-title  ">
                <Link to={`/category/${category.id}`}>{category.title}</Link>
              </h2>
              <p className="archive-card-desc text-secondary">{category.shortDesc}</p>
              <div className="archive-subcategory-list">
                {subcategories
                  .filter((subcategory) => subcategory.categoryId === category.id)
                  .map((subcategory) => (
                    <span key={subcategory.id} className="archive-subcategory-pill">
                      {subcategory.title}
                    </span>
                  ))}
              </div>
              <div className="archive-card-footer">
                <Link to={`/category/${category.id}`} className="btn">Yazıları İncele</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArchivePage;
