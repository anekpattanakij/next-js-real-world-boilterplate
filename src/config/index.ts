import  { DefaultConfig }  from './default';
import  { ProductionConfig }  from './prod';

export const Config =
  process.env.NODE_ENV !== 'production'
    ? Object.assign({}, DefaultConfig)
    : Object.assign(DefaultConfig, ProductionConfig);
