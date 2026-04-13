import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CategoryPage from './pages/TopicPage';
import AuthorProfile from './pages/AuthorProfile';
import ArticleView from './pages/ArticleView';
import ArchivePage from './pages/ArchivePage';
import AuthorsPage from './pages/AuthorsPage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/authors" element={<AuthorsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile/:id" element={<AuthorProfile />} />
          <Route path="/article/:id" element={<ArticleView />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
