import messages from './messages/en.json';
import { formats } from './src/i18n/request';

declare module "*.css" {
  const content: any;
  export default content;
}
 
declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof messages;
    Formats: typeof formats;
  }
}