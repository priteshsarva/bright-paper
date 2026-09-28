import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { chatApiPlugin } from './server/vitePlugin';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Empty prefix loads every key, including the server-only ones that must
  // never be exposed to the client (GEMINI_API_KEY, LEAD_WEBHOOK_URL).
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), chatApiPlugin(env)],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
