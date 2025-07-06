import React from 'react';
import './Layout.css';

export const Layout = ({ children }) => (
  <div className="app-layout">
    {children}
  </div>
);

export const Header = ({ children }) => (
  <header className="app-header">
    <div className="container">
      {children}
    </div>
  </header>
);

export const Main = ({ children }) => (
  <main className="app-main">
    <div className="container">
      {children}
    </div>
  </main>
);

export const Footer = ({ children }) => (
  <footer className="app-footer">
    <div className="container">
      {children}
    </div>
  </footer>
);
