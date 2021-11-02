/**
 * @author linhuiw
 * @desc 导出未翻译文件
 */
require('ts-node').register({
  compilerOptions: {
    module: 'commonjs'
  }
});
import * as fs from 'fs';
import { tsvFormatRows } from 'd3-dsv';
import { getAllMessages, getProjectConfig } from './utils';
import * as _ from 'lodash';

function exportMessages(file?: string, lang?: string) {
  const CONFIG = getProjectConfig();
  const langs = lang ? [lang] : CONFIG.distLangs;
  const allMessages = getAllMessages(CONFIG.srcLang);
  const langsMessages = langs.filter(val => {return val != CONFIG.srcLang}).map(lang => {
    return getAllMessages(lang);
  })
  const allTemplate = []
  allTemplate.push(['key', CONFIG.srcLang, ...langs.filter(val => { return val != CONFIG.srcLang })]);
  for (const key in allMessages) {
    allTemplate.push([key, allMessages[key], ...langsMessages.map(val => val[key])]);
  }
  fs.writeFileSync('./export-all', tsvFormatRows(allTemplate));
  langs.map(lang => {
    
    const existingTranslations = getAllMessages(
      lang,
      (message, key) => !/[\u4E00-\u9FA5]/.test(allMessages[key]) || allMessages[key] !== message
    );
    const messagesToTranslate = Object.keys(allMessages)
      .filter(key => !existingTranslations.hasOwnProperty(key))
      .map(key => {
        let message = allMessages[key];
        message = JSON.stringify(message).slice(1, -1);
        return [key, message];
      });

    if (messagesToTranslate.length === 0) {
      console.log('All the messages have been translated.');
      return;
    }

    const content = tsvFormatRows(messagesToTranslate);
    const sourceFile = file || `./export-${lang}`;
    fs.writeFileSync(sourceFile, content);
    console.log(`Exported ${messagesToTranslate.length} message(s).`);
  });
}

export { exportMessages };
