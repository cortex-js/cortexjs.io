// @ts-check

import styles from './src/prism/theme-light';
import loadScripts from './plugins/load-scripts';
import remarkMath from 'remark-math';

import codePlaygroundRemarkPlugin from './plugins/code-playground';
import remarkLatexDelimiters from './plugins/remark-latex-delimiters';
import { getDocusaurusNavbarConfig, getDocusaurusFooterConfig } from './src/shared/utils/docusaurus-config';

import type { Config } from '@docusaurus/types';

/** @type {import('@docusaurus/types').Config} */
const config: Config = {
  title: 'MathLive',
  titleDelimiter: '·',
  tagline: 'Scientific Web Computing',
  favicon: '/img/logo.webp',

  url: 'https://mathlive.io',

  // Since we use a custom domain, we set the base URL to '/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'cortex-js',
  projectName: 'cortex-js.github.io',
  deploymentBranch: 'master',
  trailingSlash: true,

  onBrokenLinks: 'warn',
  onBrokenAnchors: 'warn',
  onDuplicateRoutes: 'warn',

  markdown: {
    hooks: {
        onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        // debug: true, // This will enable the plugin in production

        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },

        docs: {
          showLastUpdateTime: true,
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          remarkPlugins: [codePlaygroundRemarkPlugin, remarkLatexDelimiters, remarkMath],

          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        pages: {
          remarkPlugins: [codePlaygroundRemarkPlugin, remarkLatexDelimiters, remarkMath],
        },

        blog: false,
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        // },
        theme: {
          customCss: [
            './src/shared/styles/variables.css',
            './src/css/colors.css',
            './src/css/typography.css',
            './src/css/code-playground.css',
            './src/css/tables.css',
            './src/css/custom.css',
            './src/css/code.css',
            './src/css/icons.css',
          ],
        },
      },
    ],
  ],

  // The Inter font is hosted on rsms.me
  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://rsms.me/',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://rsms.me/inter/inter.css',
        media: 'print',
        onload: "this.media='all'",
      },
    },
    // Preload critical fonts for better performance
    {
      tagName: 'link',
      attributes: {
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        href: '/fonts/berkeley-mono/BerkeleyMono-Regular.woff2',
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        href: '/fonts/berkeley-mono/BerkeleyMono-Bold.woff2',
        crossorigin: 'anonymous',
      },
    },
    // Preload most critical KaTeX fonts from MathLive CDN
    {
      tagName: 'link',
      attributes: {
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        href: 'https://cdn.jsdelivr.net/npm/mathlive/fonts/KaTeX_Main-Regular.woff2',
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        href: 'https://cdn.jsdelivr.net/npm/mathlive/fonts/KaTeX_Math-Italic.woff2',
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        href: 'https://cdn.jsdelivr.net/npm/mathlive/fonts/KaTeX_AMS-Regular.woff2',
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        href: 'https://cdn.jsdelivr.net/npm/mathlive/fonts/KaTeX_Size1-Regular.woff2',
        crossorigin: 'anonymous',
      },
    },
    // Preload hero images for better performance
    {
      tagName: 'link',
      attributes: {
        rel: 'preload',
        as: 'image',
        href: '/img/hand-slugs.jpg',
        fetchpriority: 'high',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preload',
        as: 'image',
        href: '/img/hand-gears.jpg',
        fetchpriority: 'high',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preload',
        as: 'image',
        href: '/img/hand-cube2.jpg',
        fetchpriority: 'high',
      },
    },
  ],

  clientModules: ['./modules/route-update.js'],

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        createRedirects(existingPath) {
          if (existingPath.includes('/mathfield')) {
            // Redirect from /docs/mathfield to /docs/mathlive
            return [
              existingPath.replace('/mathfield', '/mathlive'),
            ];
          }
          return undefined; // Return a falsy value: no redirect created
        },
      },
    ],
  

    loadScripts,
    // [
    //   '@docusaurus/plugin-pwa',
    //   /** @type {import('@docusaurus/plugin-pwa').Options} */
    //   ({
    //     pwaHead: [
    //       {
    //         tagName: 'link',
    //         rel: 'icon',
    //         href: 'img/jest.png',
    //       },
    //       {
    //         tagName: 'link',
    //         rel: 'manifest',
    //         href: 'manifest.json',
    //       },
    //       {
    //         tagName: 'meta',
    //         name: 'theme-color',
    //         content: '#FFF',
    //       },
    //       {
    //         tagName: 'meta',
    //         name: 'apple-mobile-web-app-capable',
    //         content: 'yes',
    //       },
    //       {
    //         tagName: 'meta',
    //         name: 'apple-mobile-web-app-status-bar-style',
    //         content: '#000',
    //       },
    //       {
    //         tagName: 'link',
    //         rel: 'apple-touch-icon',
    //         href: 'img/jest.png',
    //       },
    //       {
    //         tagName: 'link',
    //         rel: 'mask-icon',
    //         href: 'img/jest.svg',
    //         color: JestThemeColor,
    //       },
    //       {
    //         tagName: 'meta',
    //         name: 'msapplication-TileImage',
    //         content: 'img/jest.png',
    //       },
    //       {
    //         tagName: 'meta',
    //         name: 'msapplication-TileColor',
    //         content: '#000',
    //       },
    //     ],
    //   }),
    // ],
  ],

  // themes: ['@docusaurus/theme-search-algolia'],


  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      image: 'img/social-card.jpg',
      colorMode: {
        disableSwitch: true,
        respectPrefersColorScheme: true,
      },

      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },

      algolia: {
        // The application ID provided by Algolia
        appId: 'Q23Y5RN3UQ',
  
        // Public API key: it is safe to commit it
        apiKey: 'c3008baa16b5ec52773c460530fb14e1',
  
        indexName: 'cortexjs',
  
        // Optional: see doc section below
        contextualSearch: false,
  
        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        // externalUrlRegex: 'external\\.com|domain\\.com',
  
        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        replaceSearchResultPathname: {
          from: '/docs/', // or as RegExp: /\/docs\//
          to: '/',
        },
  
        // Optional: Algolia search parameters
        searchParameters: {},
  
        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',
  
        // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
        insights: false,
        disableUserPersonalization: true,
        placeholder: 'Search',
  
      },
  
      navbar: getDocusaurusNavbarConfig(),
      footer: getDocusaurusFooterConfig(),
      prism: {
        additionalLanguages: [
          // See https://prismjs.com/#supported-languages for a full list
          'markup',
          'css',
          'javascript',
          'typescript',
          'json',
          'latex',
          'bash',
        ],
        // theme: styles,
        theme: styles,
        // darkTheme: prismThemes.dracula,
      },
    },
};


export default config;


