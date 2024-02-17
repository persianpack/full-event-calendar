import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Full Event Calendar',
  description: 'a fully sized event calendar',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'About Full-Event-Calendar', link: '/introduction/about' },
          { text: 'Getting Started', link: '/introduction/getting-started.md' },
          { text: 'Configuration', link: '/api-examples' }
        ]
      },
      {
        text: 'Introduction',
        items: [
          { text: 'About Full-Event-Calendar', link: '/introduction/about' },
          { text: 'Getting Started', link: '/introduction/getting-started.md' },
          { text: 'Configuration', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/persianpack/full-event-calendar' }]
  }
})
