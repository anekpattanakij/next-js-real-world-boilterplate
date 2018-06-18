import { Config } from '../config';
import * as express from 'express';
import { parse } from 'url';
import * as fs from 'fs';
import { join, resolve } from 'path';
import * as next from 'next';
import * as i18nextMiddleware from 'i18next-express-middleware';
import * as Backend from 'i18next-node-fs-backend';
import { i18nInstance } from '../i18n/i18n';

const DEFUALT_PORT = 3000;

const walkSync = (dir, filelist) => {
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(file => {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      filelist = walkSync(dir + '/' + file, filelist);
    } else {
      filelist.push(resolve(dir + '/' + file));
    }
  });
  return filelist;
};

// list static files // for working custom static path
//const fileList = walkSync(join(__dirname, '../../static'),null);

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

let localPathExist:boolean = false;
if (fs.existsSync(join(__dirname, '../../../locales'))) {
  localPathExist = true;
}
console.log(join(__dirname, '../../../locales'));
console.log(localPathExist);

const i18nLoadPath:string = !localPathExist ?join(__dirname, '../../locales/{{lng}}/{{ns}}.json'):join(__dirname, '../../../locales/{{lng}}/{{ns}}.json');

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
        loadPath: i18nLoadPath,
        addPath: join(__dirname, '../static/locales/{{lng}}/{{ns}}.missing.json'),
      },
      debug: Config.i18n.debug,
    },
    () => {
      app.prepare().then(() => {
        const server = express();
        // enable middleware for i18next
        server.use(i18nextMiddleware.handle(i18nInstance));
        // missing keys
        server.post(
          '/locales/add/:lng/:ns',
          i18nextMiddleware.missingKeyHandler(i18nInstance),
        );

        const languagePathIntercepter = (req, res, next) => {
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

        const urlParameterIntercepter = (req, res, next) => {
          // Put the preprocessing here.
          const pathname: string = req.url;
          try {
            const pathList: string[] = pathname.split('/');
            let previousPath: string;
            let passDataQueryString: string = '';
            let purePathWithoutNumber: string = '';

            for (let i = 1; i < pathList.length; i++) {
              if (i === 0) {
                previousPath = pathList[i];
              } else {
                if (!isNaN(parseInt(pathList[i]))) {
                  passDataQueryString =
                    passDataQueryString +
                    '&' +
                    previousPath +
                    '=' +
                    pathList[i];
                } else {
                  previousPath = pathList[i];
                  purePathWithoutNumber =
                    purePathWithoutNumber + '/' + pathList[i];
                }
              }
            }
            if (passDataQueryString !== '') {
              req.url = purePathWithoutNumber + '?' + passDataQueryString;
            }
          } catch (err) {
            // Do Nothing
          }
          next();
        };
        
        server.get(
          '*',
          languagePathIntercepter,
          urlParameterIntercepter,
          (req, res) => {
            handle(req, res);
            // for working custom static path
            /* const { pathname } = parse(req.url, true);
           const trueStaticPath= join(__dirname,'../../static', pathname);
           console.log(trueStaticPath + '====' + fileList);
           //console.log(join(__dirname, pathname) + '=========================' + fileList);
            if (fileList.indexOf(trueStaticPath) !== -1) {
              console.log(join(__dirname, pathname));
              res.sendFile(trueStaticPath);
            } else {
            handle(req, res);
            }           
          }, */ 
          },
        );

        server.listen(Config.port, err => {
          if (err) {
            throw err;
          }
          console.log(`> Ready on port ${Config.port}`);
        });
      });
    },
  );
