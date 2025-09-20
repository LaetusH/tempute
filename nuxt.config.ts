import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@vite-pwa/nuxt'],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()]
  },
  pages: false,
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Tempute',
      short_name: 'Tempute',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait',
      icons: [
        {
          src: '/icons/logo-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icons/logo-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '/icons/logo-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    }
  }
})