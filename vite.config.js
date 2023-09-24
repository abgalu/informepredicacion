import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react-swc'

const manifestForPlugin = {
  registerType: 'prompt',
  includeAssets: [
    'manifest-icon-192.maskable.png',
    'manifest-icon-512.maskable.png',
    'react.svg'
  ],
  manifest: {
    name: 'Contador',
    short_name: 'Contador',
    description: 'Contador is a simple application to report the activity',
    theme_color: '#5d5d5d',
    start_url: '/',
    icons: [
      {
        src: 'manifest-icon-192.maskable.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'manifest-icon-512.maskable.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)]
})
