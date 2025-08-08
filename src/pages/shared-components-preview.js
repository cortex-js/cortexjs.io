import React from 'react';
import Head from '@docusaurus/Head';
import { Header, Footer } from '../shared/components';

export default function SharedComponentsPreview() {
  return (
    <>
      <Head>
        <title>Shared Components Preview</title>
        <meta name="description" content="Preview of standalone header and footer components" />
      </Head>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Standalone Header Preview */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ padding: '1rem', margin: 0, background: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            Standalone Header (for Interactive Apps)
          </h2>
          <Header currentApp="editor" standalone={true} />
        </div>

        {/* Content Area */}
        <main style={{ flex: 1, padding: '2rem', background: '#fafafa' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1>🎯 Shared Components Preview</h1>
            
            <p>This page shows how the shared Header and Footer components will look in your standalone interactive applications.</p>

            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #ddd' }}>
              <h2>Header Features</h2>
              <ul>
                <li><strong>Documentation</strong> - Links back to main docs site</li>
                <li><strong>Compute Engine</strong> - Direct link to CE documentation</li>
                <li><strong>Tools Dropdown</strong> - Links to all interactive apps:
                  <ul>
                    <li>LaTeX Editor (editor.mathlive.io)</li>
                    <li>Calculator (calculator.mathlive.io)</li>
                    <li>Grapher (grapher.mathlive.io)</li>
                    <li>Notebook (notebook.mathlive.io)</li>
                  </ul>
                </li>
                <li><strong>GitHub</strong> - External link to repository</li>
              </ul>
            </div>

            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #ddd' }}>
              <h2>Usage in Standalone Apps</h2>
              <pre style={{ background: '#f8f8f8', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`import { Header, Footer } from '../shared/components';

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
}`}
              </pre>
            </div>

            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #ddd' }}>
              <h2>Benefits</h2>
              <ul>
                <li>✅ Consistent branding across all applications</li>
                <li>✅ Single source of truth for navigation</li>
                <li>✅ Responsive design (mobile-friendly)</li>
                <li>✅ Dark mode support built-in</li>
                <li>✅ Easy to maintain and update</li>
              </ul>
            </div>
          </div>
        </main>

        {/* Standalone Footer Preview */}
        <div style={{ marginTop: 'auto' }}>
          <h2 style={{ padding: '1rem', margin: 0, background: '#f5f5f5', borderTop: '2px solid #ccc' }}>
            Standalone Footer (for Interactive Apps)
          </h2>
          <Footer />
        </div>
      </div>
    </>
  );
}