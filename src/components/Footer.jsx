import React from 'react';
import './Footer.css';


const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <span className=" footer-title">Liberte</span>
          <p className="footer-desc text-secondary">Bireysel özgürlükleri ve serbest piyasayı savunanların ortak sesi.</p>
        </div>
        <div className="footer-links">
          <span className="text-secondary">&copy; {new Date().getFullYear()} Liberte. Tüm hakları saklıdır.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
