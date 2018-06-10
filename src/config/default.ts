import { I18nConfig } from './i18nConfig';

const DEFAULT_PORT:string = '3000';
export class DefaultConfig {
    public static host:string  = process.env.NODE_HOST || 'localhost';
    public static port:string = process.env.PORT || DEFAULT_PORT;
    public static apiHost:string  = 'http://localhost';
    public static apiPort:string = '3000';
    
    public static i18n:I18nConfig = {
      whitelist: ['en', 'de'],
      fallbackLng: ['en'],
      debug: false,
    };
  }

 

