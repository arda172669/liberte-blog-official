import React from 'react';
import { Link } from 'react-router-dom';
import './ArchivePage.css';
import { topics } from '../data/mockData';

const ArchivePage = () => {
  return (
    <div className="archive-page">
      <div className="container">
        <header className="archive-header text-center">
          <h1 className="page-title  ">Geçmiş Konular Arşivi</h1>
          <p className="text-secondary max-w-700">
            Liberte yazarlarının geçmiş haftalarda üzerine tartıştığı, fikir yürüttüğü ve makaleler yayınladığı temel gündem maddeleri.
          </p>
        </header>

        <div className="archive-timeline">
          {topics.map((topic) => (
            <div key={topic.id} className="archive-card glass-panel">
              <div className="archive-card-meta text-gold">Hafta #{topic.id} • {topic.dateRange}</div>
              <h2 className="archive-card-title  ">
                <Link to={`/topic/${topic.id}`}>{topic.title}</Link>
              </h2>
              <p className="archive-card-desc text-secondary">{topic.shortDesc}</p>
              <div className="archive-card-footer">
                <Link to={`/topic/${topic.id}`} className="btn">Tartışmaları İncele</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArchivePage;
