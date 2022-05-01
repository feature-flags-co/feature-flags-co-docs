// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '敏捷开关',
  tagline: '聪明的团队会交付',
  url: 'https://featureflag.co',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: '北京心跳率科技有限公司', // Usually your GitHub org/user name.
  projectName: '敏捷开关', // Usually your repo name.
  // themes: ['@docusaurus/theme-search-algolia'],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '敏捷开关 | 文档手册',
        logo: {
          alt: '敏捷开关Logo',
          src: 'img/logo.png',
        },
        hideOnScroll: false,
        items: [
          {
            type: 'doc',
            docId: '概览',
            position: 'left',
            label: '使用文档',
          },
          // {
          //   to: '/integration',
          //   label: '应用集成',
          //   position: 'left'
          // },
          // {
          //   to: '/docs/sdks/overview',
          //   position: 'left',
          //   label: '开发集成(SDKs&APIs)',
          // },
          { to: '/blog', label: '使用指南', position: 'left' },
          { href: 'https://portal.featureflag.co', label: '应用后台', position: 'left' },

          // {
          //   type: 'localeDropdown',
          //   position: 'right',
          // },
          {
            href: 'https://github.com/feature-flags-co/feature-flags-co/',
            label: ' ',
            position: 'right',
            className: 'header-github-link', 'aria-label': 'GitHub repository',
            target: '_blank'
          },
          {
            type: 'search',
            position: 'right',
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        // darkTheme: darkCodeTheme,
      },
      algolia: {
        // The application ID provided by Algolia
        appId: 'EMOB5QI6ZL',

        // Public API key: it is safe to commit it
        apiKey: '786a9155e7266ee47d29a75ef846cf9a',

        indexName: 'featureflagco_doc',

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: 'external\\.com|domain\\.com',

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',

        //... other Algolia params
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      i18n: {
        defaultLocale: 'en',
        locales: ['en', 'zh'],
        en: {
          htmlLang: 'zh-CN',
        },
        zh: {
          htmlLang: 'zh-CN',
        },
      },
    }),
};

module.exports = config;
