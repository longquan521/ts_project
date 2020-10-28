// cnpm i superagent --save爬虫依赖工具
// cnpm i cheerio --save用来获取页面上的各个部分的内容
// cnpm i @types/cheerio -D 文件变成ts的
// ts直接引用js会报错，ts->.d.ts 翻译文件->js
import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import cheerio from 'cheerio';
interface Ul {
  title: string;
  descs: string;
}
interface Ulresult {
  time: number;
  data: Ul[];
}
interface Content {
  [propName: number]: Ul[];
}
// 类函数Crowller负责
class Crowller {
  private secret = 'secretKey';
  // url = 'https://longquan521.github.io/index.html';
  url = 'https://xueqiu.com/?category=snb_article';
  private rawHtml = '';
  /**
   * getSmInfo()爬取页面内容
   */
  getSmInfo(html: string) {
    const $ = cheerio.load(html);
    const ulli = $('.AnonymousHome_home__timeline__item_3vU');
    const ulInfos: Ul[] = [];
    ulli.map((index, element) => {
      const title = $(element).find('.AnonymousHome_user-name_3wN').text();
      const descs = $(element).find('h3 a').text() || '内容等待更新';
      ulInfos.push({ title, descs });
    });
    // 加个当前时刻
    return {
      time: new Date().getTime(),
      data: ulInfos,
    };
    // console.log(result);
  }
  async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }
  generateJsonContent(ulInfo: Ulresult) {
    const filePath = path.resolve(__dirname, '../data/ul.json');
    let fileContent: Content = {};
    if (fs.existsSync(filePath)) {
      console.log('123456');
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    fileContent[ulInfo.time] = ulInfo.data;
    return fileContent;
    // console.log(fileContent);
  }
  async initSpiderProcess() {
    const filePath = path.resolve(__dirname, '../data/ul.json');
    const html = await this.getRawHtml();
    const ulInfo = this.getSmInfo(html);
    const fileContent = this.generateJsonContent(ulInfo);
    fs.writeFileSync(filePath, JSON.stringify(fileContent));
    // console.log(ulInfo);
  }
  constructor() {
    this.initSpiderProcess();
  }
}
const crowller = new Crowller();
