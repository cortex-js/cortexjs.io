# Shared Components Architecture

This document explains how the shared Header and Footer components work across both the Docusaurus documentation site and standalone interactive applications.

## 🎯 **Overview**

The system uses a **dual-mode approach** where the same underlying configuration and components serve both:
1. **Docusaurus Documentation Site** (`cortexjs.io`)
2. **Standalone Interactive Apps** (`editor.mathlive.io`, `calculator.mathlive.io`, etc.)

## 📁 **File Structure**

```
src/
├── shared/                           # Shared component library
│   ├── components/
│   │   ├── Header.jsx               # Standalone header component
│   │   ├── Header.css               # Unified styling
│   │   ├── Footer.jsx               # Standalone footer component
│   │   ├── Footer.css               # Footer styling
│   │   └── index.js                 # Component exports
│   ├── config/
│   │   └── navigation.json          # Single source of truth for navigation
│   ├── styles/
│   │   └── variables.css            # Shared CSS variables
│   └── utils/
│       └── docusaurus-config.js     # Config converter for Docusaurus
└── theme/                           # Docusaurus theme overrides
    ├── Navbar/
    │   └── index.js                 # Wraps Docusaurus navbar
    └── Footer/
        └── index.js                 # Wraps Docusaurus footer
```

## 🔄 **How It Works**

### **1. Configuration Source**

All navigation configuration comes from `src/shared/config/navigation.json`:

```json
{
  "navbar": {
    "title": "MathLive",
    "items": [
      {
        "type": "docSidebar",
        "sidebarId": "docSidebar", 
        "label": "Mathfield"
      },
      {
        "label": "Compute Engine",
        "href": "/compute-engine"
      },
      {
        "type": "dropdown",
        "label": "Tools",
        "items": [
          { "label": "LaTeX Editor", "href": "https://editor.mathlive.io" },
          { "label": "Calculator", "href": "https://calculator.mathlive.io" }
        ]
      }
    ]
  }
}
```

### **2. Docusaurus Integration**

**Files involved:**
- `src/theme/Navbar/index.js` - Theme override that wraps original navbar with `.shared-header`
- `src/theme/Footer/index.js` - Theme override that wraps original footer with `.shared-footer`
- `src/shared/utils/docusaurus-config.js` - Converts JSON config to Docusaurus format
- `docusaurus.config.ts` - Uses `getDocusaurusNavbarConfig()`

**Flow:**
1. `docusaurus.config.ts` calls `getDocusaurusNavbarConfig()`
2. Utility function reads `navigation.json` and converts to Docusaurus format
3. Docusaurus renders its native navbar/footer with our config
4. Theme overrides wrap with `.shared-header`/`.shared-footer` classes
5. Shared CSS applies to both implementations

### **3. Standalone Applications**

**Files involved:**
- `src/shared/components/Header.jsx` - Standalone header component  
- `src/shared/components/Footer.jsx` - Standalone footer component

**Flow:**
1. Components directly import and read `navigation.json`
2. **Content filtering** happens based on `standalone` prop
3. Components render using Docusaurus CSS classes
4. Components wrap themselves with `.shared-header`/`.shared-footer` classes
5. Same CSS applies as in Docusaurus case

## 🎛️ **Content Filtering Logic**

The standalone header modifies navigation content in three ways:

### **1. Filter Out docSidebar Items**
```javascript
// In Header.jsx line 10-12
const filteredItems = standalone 
  ? navbar.items.filter(item => item.type !== 'docSidebar')  // Remove "Mathfield"
  : navbar.items;
```

### **2. Add "Documentation" Link**  
```javascript
// In Header.jsx lines 43-47
{standalone && (
  <a href="/" className="navbar__item navbar__link">
    Documentation
  </a>
)}
```

### **3. Convert docSidebar to Regular Links**
```javascript  
// In Header.jsx lines 98-103
if (item.type === 'docSidebar' && standalone) {
  return (
    <a href="/mathfield" className="navbar__item navbar__link">
      {item.label}  // Converts to regular link instead of sidebar trigger
    </a>
  );
}
```

## 🎨 **Styling Strategy**

### **Unified CSS Classes**
Both Docusaurus and standalone components use **identical CSS classes**:

**Header:**
- `.navbar`, `.navbar__item`, `.navbar__link`
- `.dropdown`, `.dropdown__menu`, `.dropdown__link`  
- `.navbar__brand`, `.navbar__logo`

**Footer:**
- `.footer`, `.footer--dark`, `.footer__links`
- `.footer__title`, `.footer__link-item`, `.footer__copyright`
- `.container`, `.row`, `.col`

### **Styling Files**
- `src/shared/styles/variables.css` - Shared CSS custom properties
- `src/shared/components/Header.css` - Component-specific styles
- `src/shared/components/Footer.css` - Footer styles

### **Benefits**
- ✅ **Visual Consistency**: Both implementations look identical
- ✅ **Single Maintenance**: One set of styles to maintain
- ✅ **Theme Compatibility**: Inherits Docusaurus dark mode, etc.

## 📱 **Usage Examples**

### **In Docusaurus** (Automatic)
```javascript
// docusaurus.config.ts
navbar: getDocusaurusNavbarConfig(),
footer: getDocusaurusFooterConfig(),
```

### **In Standalone Apps**
```javascript
import { Header, Footer } from '../shared/components';

function App() {
  return (
    <>
      <Header currentApp="editor" standalone={true} />
      <main>
        {/* Your interactive app content */}
      </main>
      <Footer />
    </>
  );
}
```

## 🔧 **Development Workflow**

### **Adding Navigation Items**
1. Edit `src/shared/config/navigation.json`
2. Changes automatically apply to both Docusaurus and standalone apps
3. No code changes needed in most cases

### **Styling Changes**  
1. Edit CSS files in `src/shared/components/` or `src/shared/styles/`
2. Changes apply to both implementations
3. Test using `/shared-components-preview` page

### **Adding New Interactive Apps**
1. Add entry to Tools dropdown in `navigation.json`
2. Create new React app using shared components
3. Deploy to appropriate subdomain

## 🚀 **Deployment Strategy**

### **Documentation Site**
- Built with Docusaurus to `submodules/cortex-js.github.io/`
- Deployed to GitHub Pages at `cortexjs.io`

### **Interactive Apps** 
- Each app builds independently using shared components
- Deploy to subdomains via Cloudflare routing:
  - `editor.mathlive.io` → `/apps/editor/`
  - `calculator.mathlive.io` → `/apps/calculator/`
  - etc.

## 🐛 **Troubleshooting**

### **"Cannot read properties of null" errors**
- Usually caused by replacing Docusaurus navbar completely
- Solution: Use wrapper approach in theme overrides

### **Styling Inconsistencies**
- Check that both implementations use same CSS classes
- Verify shared variables are imported properly

### **Navigation Not Updating**
- Clear Docusaurus cache: `npm run clear`
- Check `navigation.json` syntax
- Verify `getDocusaurusNavbarConfig()` is called in config

## 📈 **Future Enhancements**

1. **Authentication Integration**: Add user login state to shared header
2. **Dynamic Configuration**: Load navigation from API or CMS
3. **Analytics Integration**: Track navigation usage across apps
4. **A/B Testing**: Test different navigation structures
5. **Internationalization**: Multi-language support for navigation