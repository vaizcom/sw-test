import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(),
        VitePWA({
            workbox: {
                maximumFileSizeToCacheInBytes: 3145728, // 3MB
            },
            devOptions: {
                enabled: false,
            },
            injectRegister: 'auto',
            includeAssets: [],
            manifest: {
                name: 'Test',
                short_name: 'Test',
                start_url: '/',
                scope: '/',
                description: 'All the project management tools you need in one workspace',
                display: 'standalone',
                categories: ['productivity', 'utilities'],
                background_color: '#ffffff',
                screenshots: [],
                icons: [
                    {
                        src: '/pwa-1024x1024.png',
                        sizes: '1024x1024',
                        type: 'image/png',
                    },
                ],
            },
        }),],
})
