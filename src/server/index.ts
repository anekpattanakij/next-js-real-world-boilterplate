import { Config } from './../config';
import * as express from 'express';
import { parse } from 'url';
import * as fs from 'fs';
import { join } from 'path';
import * as next from 'next';
import * as i18nextMiddleware from 'i18next-express-middleware';
import * as Backend from 'i18next-node-fs-backend';
import { i18nInstance } from '../i18n/i18n';

const DEFUALT_PORT = 3000;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// list static files
const staticDir = join(__dirname, '../static');
const rootStaticFiles = fs.readdirSync(staticDir).map(name => `/${name}`);

export const languageDetector = new i18nextMiddleware.LanguageDetector(null, {
  order: ['path'],
  lookupFromPathIndex: 0,
});

i18nInstance
  .use(Backend)
  .use(languageDetector)
  .init(
    {
      whitelist: Config.i18n.whitelist,
      fallbackLng: Config.i18n.fallbackLng,
      preload: Config.i18n.whitelist, // preload all langages
      ns: ['common', 'home', 'page2'], // need to preload all the namespaces
      backend: {
        loadPath: join(__dirname, '../../locales/{{lng}}/{{ns}}.json'),
        addPath: join(__dirname, '../../locales/{{lng}}/{{ns}}.missing.json'),
      },
      debug: Config.i18n.debug,
    },
    () => {
      app.prepare().then(() => {
        const server = express();
        // enable middleware for i18next
        server.use(i18nextMiddleware.handle(i18nInstance));
        // serve locales for client
        server.use('/locales', express.static(join(__dirname, '../locales')));
        // missing keys
        server.post(
          '/locales/add/:lng/:ns',
          i18nextMiddleware.missingKeyHandler(i18nInstance),
        );

        const pathIntercepter = (req, res, next) => {
          // Put the preprocessing here.
          const pathname = req.url;
          try {
            const languageInPath = pathname.substr(
              1,
              pathname.indexOf('/', 1) - 1,
            );
            if (Config.i18n.whitelist.indexOf(languageInPath) >= 0) {
              req.url = pathname.substr(pathname.indexOf('/', 1));
            }
          } catch (err) {
            // Do Nothing
          }
          next();
        };

        server.get('*', pathIntercepter, (req, res) => {
          const { pathname } = parse(req.url, true);

          // serve static files from roots
          if (rootStaticFiles.indexOf(pathname) !== -1) {
            return app.serveStatic(req, res, join(staticDir, pathname));
          }
          handle(req, res);
        });

        server.listen(Config.port, err => {
          if (err) {
            throw err;
          }
          console.log(`> Ready on port ${Config.port}`);
        });
      });
    },
  );
