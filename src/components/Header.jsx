import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Feather, Menu, Type, Maximize, ZoomIn, ZoomOut } from 'lucide-react';
import './Header.css';


const Header = () => {
  const [textSize, setTextSize] = useState('normal');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-text-size', textSize);
  }, [textSize]);

  const handleTextSizeChange = () => {
    const sizes = ['small', 'normal', 'large', 'xlarge'];
    const currentIndex = sizes.indexOf(textSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    setTextSize(sizes[nextIndex]);
  };

  return (
    <header className="site-header glass-panel">
      <div className="container header-container">
        <Link to="/" className="brand" onClick={() => setIsMobileMenuOpen(false)}>
          <Feather className="brand-icon text-gold" size={28} />
          <span className="brand-name ">Liberte</span>
        </Link>
        
        <nav className={`main-nav ${isMobileMenuOpen ? 'mobile-active' : 'desktop-only'}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Ana Sayfa</Link>
          <Link to="/topic/42" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Haftanın Konusu</Link>
          <Link to="/archive" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Arşiv</Link>
          <Link to="/authors" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Yazarlar</Link>
        </nav>

        <div className={`header-actions ${isMobileMenuOpen ? 'mobile-active' : 'desktop-only'}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          
          {/* Accessibility Toggle */}
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

          <Link to="/profile/me" className="btn btn-primary" onClick={() => setIsMobileMenuOpen(false)}>Profilim</Link>
        </div>

        <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
