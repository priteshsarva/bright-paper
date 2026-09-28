import type { Plugin } from 'vite';
import { handleChat, type ChatEnv } from './chat';

const DEFAULT_MODEL = 'gemini-3.6-flash';

/**
 * Serves POST /api/chat from inside the Vite dev server so the Gemini key and
 * the lead webhook stay in the Node process and never reach the browser bundle.
 */
export function chatApiPlugin(env: Record<string, string>): Plugin {
  const config: ChatEnv = {
    apiKey: env.GEMINI_API_KEY ?? '',
    model: env.GEMINI_MODEL || DEFAULT_MODEL,
    leadWebhookUrl: env.LEAD_WEBHOOK_URL ?? '',
  };

  return {
    name: 'bright-paper-chat-api',
    apply: 'serve',

    configureServer(server) {
      if (!config.apiKey) {
        server.config.logger.warn(
          '[chat] GEMINI_API_KEY is missing from .env — /api/chat will return 500.',
        );
      }
      if (!config.leadWebhookUrl) {
        server.config.logger.warn(
          '[chat] LEAD_WEBHOOK_URL is missing from .env — leads will not be saved.',
        );
      }

      server.middlewares.use('/api/chat', (req, res, next) => {
        if (!config.apiKey) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'GEMINI_API_KEY is not configured on the server.' }));
          return;
        }

        handleChat(req, res, config).catch((error) => {
          server.config.logger.error(`[chat] unhandled: ${error}`);
          if (!res.headersSent) res.writeHead(500).end();
          else res.end();
          next();
        });
      });
    },
  };
}
