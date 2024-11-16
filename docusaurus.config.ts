// @ts-check

import { themes as prismThemes } from 'prism-react-renderer';
import styles from './src/prism/theme-light';
import loadScripts from './plugins/load-scripts';
import remarkMath from 'remark-math';

import codePlaygroundRemarkPlugin from './plugins/code-playground';

import type { Config } from '@docusaurus/types';

/** @type {import('@docusaurus/types').Config} */
const config: Config = {
  title: 'CortexJS',
  titleDelimiter: '·',
  tagline: 'Scientific Web Computing',
  favicon: '/img/favicon.ico',

  url: 'https://cortexjs.io',

  // Since we use a custom domain, we set the base URL to '/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'cortex-js',
  projectName: 'cortex-js.github.io',
  deploymentBranch: 'master',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

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

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      image: 'img/social-card.jpg',
      colorMode: {
        disableSwitch: true,
        respectPrefersColorScheme: true,
      },
      algolia: {
        apiKey: 'YOUR_API_KEY',
        appId: 'YOUR_INDEX_NAME',
        indexName: 'YOUR_INDEX_NAME',
        contextualSearch: true,
      },
      navbar: {
        title: 'CortexJS',
        // logo: {
        //   alt: "Farsight Logo",
        //   src: "farsight-logo.svg",
        //   width: 42,
        //   height: 42,
        // },
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
                label: 'GitHub',
                icon: '<svg class="icon1quarterem"><use role="none" xlink:href="/static/icons.svg#github"></use></svg>',
                href: 'https://github.com/cortex-js',
              },
              {
                label: 'Discord',
                icon: '<svg class="icon1quarterem"><use role="none" xlink:href="/static/icons.svg#discord"></use></svg>',
                href: 'https://discord.gg/yhmvVeJ4Hd',
              },
              {
                label: 'AI Assistant',
                icon: '<svg class="icon1quarterem"><use role="none" xlink:href="/static/icons.svg#openai"></use></svg>',
                href: 'https://chat.openai.com/g/g-8YgEfR7ig-cortexjs-assistant',
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
        // copyright: `Copyright CortexJS.`,
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
