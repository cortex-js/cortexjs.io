import React, { useState } from 'react';
import navigationConfig from '../config/navigation.json';
import './Header.css';

export function Header({ currentApp = 'docs', standalone = true }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { navbar, logo } = navigationConfig;

  // Filter out docSidebar items for standalone apps
  const filteredItems = standalone 
    ? navbar.items.filter(item => item.type !== 'docSidebar')
    : navbar.items;

  return (
    <div className="shared-header">
      <header className="navbar navbar--fixed-top">
      <div className="navbar__inner">
        <div className="navbar__items">
          <a href="/" className="navbar__brand">
            <img 
              src={logo.src} 
              alt={logo.alt} 
              width={logo.width} 
              height={logo.height}
              className="navbar__logo"
            />
            <strong className="navbar__title">{navbar.title}</strong>
          </a>
        </div>
        
        {/* Center navigation items */}
        <div className={`navbar__items ${mobileMenuOpen ? 'navbar__items--show-mobile' : ''}`}>
          {/* Add standalone app-specific navigation */}
          {standalone && (
            <a href="/" className="navbar__item navbar__link">
              Documentation
            </a>
          )}
          
          {filteredItems.map((item, index) => (
            <NavItem key={index} item={item} currentApp={currentApp} standalone={standalone} />
          ))}
        </div>

        {/* Right-aligned items */}
        <div className="navbar__items navbar__items--right">
          <button 
            className="navbar__toggle clean-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
              <path stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" d="M4 7h22M4 15h22M4 23h22"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
    </div>
  );
}

function NavItem({ item, standalone }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (item.type === 'dropdown') {
    return (
      <div 
        className="navbar__item dropdown dropdown--hoverable"
        onMouseEnter={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}
      >
        <a className="navbar__link" href="#" onClick={(e) => e.preventDefault()}>
          {item.label}
        </a>
        {dropdownOpen && (
          <ul className="dropdown__menu">
            {item.items.map((subItem, index) => (
              <li key={index}>
                <a 
                  href={subItem.href}
                  className="dropdown__link"
                  target={subItem.href?.startsWith('http') ? '_blank' : undefined}
                  rel={subItem.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {subItem.label}
                  {subItem.href?.startsWith('http') && (
                    <svg className="iconExternalLink_nPIU" width="13.5" height="13.5" aria-hidden="true" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"/>
                    </svg>
                  )}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  // For standalone apps, convert docSidebar items to regular links
  if (item.type === 'docSidebar' && standalone) {
    return (
      <a href="/mathfield" className="navbar__item navbar__link">
        {item.label}
      </a>
    );
  }

  // For docSidebar items in Docusaurus, just show the label (shouldn't happen in standalone)
  if (item.type === 'docSidebar') {
    return (
      <span className="navbar__item navbar__link">
        {item.label}
      </span>
    );
  }

  return (
    <a 
      href={item.href} 
      className="navbar__item navbar__link"
      target={item.href?.startsWith('http') ? '_blank' : undefined}
      rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {item.label}
      {item.icon && (
        <svg className="iconExternalLink_nPIU" width="13.5" height="13.5" aria-hidden="true" viewBox="0 0 24 24">
          <path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"/>
        </svg>
      )}
    </a>
  );
}