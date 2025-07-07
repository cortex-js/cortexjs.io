// @ts-check

import { themes as prismThemes } from 'prism-react-renderer';
import styles from './src/prism/theme-light';
import loadScripts from './plugins/load-scripts';
import remarkMath from 'remark-math';

import codePlaygroundRemarkPlugin from './plugins/code-playground';

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
  onBrokenMarkdownLinks: 'warn',
  onDuplicateRoutes: 'warn',

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
          remarkPlugins: [codePlaygroundRemarkPlugin, remarkMath],

          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        pages: {
          remarkPlugins: [codePlaygroundRemarkPlugin, remarkMath],
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
  
      navbar: {
        title: 'MathLive',
        logo: {
          alt: "MathLive Logo",
          src: "img/logo.webp",
          width: 42,
          height: 42,
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docSidebar',
            position: 'left',
            label: 'Mathfield',
          },
          {
            to: '/compute-engine',
            position: 'left',
            label: 'Compute Engine',
          },
          // { to: "/mathfield", label: "Mathfield", position: "left" },
          // { to: "/compute-engine", label: "Compute Engine", position: "left" },
          {
            href: 'https://github.com/cortex-js',
            label: 'GitHub',
            icon: 'github',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Mathfield',
                to: '/mathfield',
              },
              {
                label: 'Compute Engine',
                to: '/compute-engine',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {                
                html: '<a href="https://github.com/cortex-js" target="_blank" rel="noopener noreferrer" class="footer__link-item"><svg class="icon-one-rem"><use role="none" xlink:href="/icons.svg#github"></use></svg>GitHub<svg width="13.5" height="13.5" aria-hidden="true" viewBox="0 0 24 24" class="iconExternalLink_nPIU"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg></a>',
              },
              {                
                html: '<a href="https://discord.gg/yhmvVeJ4Hd" target="_blank" rel="noopener noreferrer" class="footer__link-item"><svg class="icon-one-rem"><use role="none" xlink:href="/icons.svg#discord"></use></svg>Discord<svg width="13.5" height="13.5" aria-hidden="true" viewBox="0 0 24 24" class="iconExternalLink_nPIU"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg></a>',
              },
              {                
                html: '<a href="https://chatgpt.com/g/g-8YgEfR7ig-mathlive-gpt" target="_blank" rel="noopener noreferrer" class="footer__link-item"><svg class="icon-one-rem"><use role="none" xlink:href="/icons.svg#openai"></use></svg>MathLive GPT<svg width="13.5" height="13.5" aria-hidden="true" viewBox="0 0 24 24" class="iconExternalLink_nPIU"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg></a>',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'About Us',
                to: '/about',
              },
            ],
          },
        ],
        // copyright: `Copyright MathLive.`,
      },
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

// theme$h as dracula,
// theme$g as duotoneDark,
// theme$f as duotoneLight,
// theme$e as github,
// theme$3 as jettwaveDark,
// theme$2 as jettwaveLight,
// theme$d as nightOwl,
// theme$c as nightOwlLight,
// theme$b as oceanicNext,
// theme$a as okaidia,
// theme$1 as oneDark,
// theme as oneLight,
// theme$9 as palenight,
// theme$8 as shadesOfPurple,
// theme$7 as synthwave84,
// theme$6 as ultramin,
// theme$5 as vsDark,
// theme$4 as vsLight,

export default config;


