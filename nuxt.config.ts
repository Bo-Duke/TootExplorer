// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      title: 'TootExplorer 💫',
      meta: [{ name: 'description', content: 'Explore nearby Mastodon instances' }],
      bodyAttrs: {
        class: 'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white',
      }
    },
  },
});
