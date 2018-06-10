import { DefaultConfig } from './default';
import { I18nConfig } from './i18nConfig';

export class ProductionConfig extends DefaultConfig {
  // Over write default settings here...
  public static i18n:I18nConfig = {
    whitelist: ['en', 'de'],
    fallbackLng: ['en'],
    debug: false,
  };
}
