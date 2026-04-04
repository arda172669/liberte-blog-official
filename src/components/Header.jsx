import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Feather, Menu, Search, Type, Maximize, ZoomIn, ZoomOut } from 'lucide-react';
import './Header.css';


const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [textSize, setTextSize] = useState('normal');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-text-size', textSize);
  }, [textSize]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get('q') || '');
  }, [location.search]);

  const handleTextSizeChange = () => {
    const sizes = ['small', 'normal', 'large', 'xlarge'];
    const currentIndex = sizes.indexOf(textSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    setTextSize(sizes[nextIndex]);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const trimmedQuery = searchQuery.trim();
    const params = new URLSearchParams();

    if (trimmedQuery) {
      params.set('q', trimmedQuery);
    }

    navigate(`/search${params.toString() ? `?${params.toString()}` : ''}`);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="site-header glass-panel">
      <div className="container header-container">
        <Link to="/" className="brand" onClick={() => setIsMobileMenuOpen(false)}>
          <Feather className="brand-icon text-gold" size={28} />
          <span className="brand-name ">Liberte</span>
        </Link>
        
        <div className={`header-panel ${isMobileMenuOpen ? 'mobile-active' : 'desktop-only'}`}>
          <nav className="main-nav">
            <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Ana Sayfa</Link>
            <Link to="/archive" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Kategoriler</Link>
            <Link to="/authors" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Yazarlar</Link>
          </nav>

          <form className="header-search" onSubmit={handleSearchSubmit}>
            <Search size={16} className="header-search-icon" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="header-search-input"
              placeholder="Makale, konu veya yazar ara"
              aria-label="Site içinde ara"
            />
          </form>

          <div className="header-actions">
            <button
              onClick={handleTextSizeChange}
              className="btn accessibility-btn text-secondary hover-gold"
              title="Metin Boyutunu Değiştir"
            >
              {textSize === 'small' && <ZoomOut size={18} />}
              {textSize === 'normal' && <Type size={18} />}
              {textSize === 'large' && <ZoomIn size={18} />}
              {textSize === 'xlarge' && <Maximize size={18} />}
            </button>

          </div>
        </div>

        <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
