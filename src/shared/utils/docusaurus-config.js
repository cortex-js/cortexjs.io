import navigationConfig from '../config/navigation.json';

/**
 * Convert shared navigation config to Docusaurus format
 */
export function getDocusaurusNavbarConfig() {
  const { navbar } = navigationConfig;
  
  // Convert dropdown items to Docusaurus format
  const items = navbar.items.map(item => {
    if (item.type === 'dropdown') {
      return {
        type: 'dropdown',
        label: item.label,
        position: item.position || 'left',
        items: item.items.map(subItem => ({
          label: subItem.label,
          href: subItem.href?.startsWith('http') ? subItem.href : undefined,
          to: subItem.href?.startsWith('http') ? undefined : subItem.href,
        }))
      };
    }
    
    if (item.type === 'docSidebar') {
      return {
        type: 'docSidebar',
        sidebarId: item.sidebarId,
        position: item.position || 'left',
        label: item.label,
      };
    }
    
    return {
      label: item.label,
      href: item.href?.startsWith('http') ? item.href : undefined,
      to: item.href?.startsWith('http') ? undefined : item.href,
      position: item.position || 'left',
      icon: item.icon,
    };
  });

  return {
    title: navbar.title,
    logo: navigationConfig.logo,
    items,
  };
}

/**
 * Convert shared navigation config to Docusaurus footer format
 */
export function getDocusaurusFooterConfig() {
  const { footer } = navigationConfig;
  
  const links = footer.sections.map(section => ({
    title: section.title,
    items: section.items.map(item => {
      if (item.icon) {
        return {
          html: `<a href="${item.href}" target="${item.href.startsWith('http') ? '_blank' : '_self'}" rel="${item.href.startsWith('http') ? 'noopener noreferrer' : ''}" class="footer__link-item">
            <svg class="icon-one-rem"><use role="none" xlink:href="/icons.svg#${item.icon}"></use></svg>
            ${item.label}
            ${item.href.startsWith('http') ? '<svg width="13.5" height="13.5" aria-hidden="true" viewBox="0 0 24 24" class="iconExternalLink_nPIU"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg>' : ''}
          </a>`,
        };
      }
      
      return {
        label: item.label,
        href: item.href.startsWith('http') ? item.href : undefined,
        to: item.href.startsWith('http') ? undefined : item.href,
      };
    })
  }));

  return {
    style: 'dark',
    links,
    copyright: footer.copyright,
  };
}