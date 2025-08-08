import React from 'react';
import navigationConfig from '../config/navigation.json';
import './Footer.css';

export function Footer() {
  const { footer } = navigationConfig;

  return (
    <div className="shared-footer">
      <footer className="footer footer--dark">
        <div className="container container-fluid">
          <div className="row footer__links">
            {footer.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="col footer__col">
                <div className="footer__title">{section.title}</div>
                <ul className="footer__items clean-list">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="footer__item">
                      <FooterLink item={item} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {footer.copyright && (
            <div className="footer__bottom text--center">
              <div className="footer__copyright">
                {footer.copyright}
              </div>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}

function FooterLink({ item }) {
  const isExternal = item.href?.startsWith('http');
  
  if (item.icon) {
    // Use the same HTML structure as Docusaurus footer icons
    const iconHtml = `<svg class="icon-one-rem"><use role="none" xlink:href="/icons.svg#${item.icon}"></use></svg>${item.label}${isExternal ? '<svg width="13.5" height="13.5" aria-hidden="true" viewBox="0 0 24 24" class="iconExternalLink_nPIU"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg>' : ''}`;
    
    return (
      <span 
        className="footer__link-item"
        dangerouslySetInnerHTML={{ __html: `<a href="${item.href}" target="${isExternal ? '_blank' : '_self'}" rel="${isExternal ? 'noopener noreferrer' : ''}">${iconHtml}</a>` }}
      />
    );
  }

  return (
    <a 
      href={item.href}
      className="footer__link-item"
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {item.label}
      {isExternal && (
        <svg className="iconExternalLink_nPIU" width="13.5" height="13.5" aria-hidden="true" viewBox="0 0 24 24">
          <path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"/>
        </svg>
      )}
    </a>
  );
}