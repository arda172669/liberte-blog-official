import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import TopicPage from './pages/TopicPage';
import AuthorProfile from './pages/AuthorProfile';
import ArticleView from './pages/ArticleView';
import ArchivePage from './pages/ArchivePage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topic/:id" element={<TopicPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/authors" element={<Home />} /> {/* Just routing back to home for now */}
          <Route path="/profile/:id" element={<AuthorProfile />} />
          <Route path="/article/:id" element={<ArticleView />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
