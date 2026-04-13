import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
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
        
        <div id="site-navigation" className={`header-panel ${isMobileMenuOpen ? 'mobile-active' : 'desktop-only'}`}>
          <nav className="main-nav" aria-label="Ana gezinme">
            <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Ana Sayfa</NavLink>
            <NavLink to="/archive" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Kategoriler</NavLink>
            <NavLink to="/authors" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Yazarlar</NavLink>
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
              type="button"
              onClick={handleTextSizeChange}
              className="btn accessibility-btn text-secondary hover-gold"
              title="Metin Boyutunu Değiştir"
              aria-label="Metin boyutunu değiştir"
            >
              {textSize === 'small' && <ZoomOut size={18} />}
              {textSize === 'normal' && <Type size={18} />}
              {textSize === 'large' && <ZoomIn size={18} />}
              {textSize === 'xlarge' && <Maximize size={18} />}
            </button>

          </div>
        </div>

        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="site-navigation"
        >
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
