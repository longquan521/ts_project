// cnpm i superagent --save爬虫依赖工具
// cnpm i cheerio --save用来获取页面上的各个部分的内容
// cnpm i @types/cheerio -D 文件变成ts的
// ts直接引用js会报错，ts->.d.ts 翻译文件->js
import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import cheerio from 'cheerio';
interface Sm {
  title: string;
  descs: string;
}
interface SmResult {
  time: number;
  data: Sm[];
}
interface Content {
  [propName: number]: Sm[];
}
// 类函数Crowller负责
class Crowller {
  private url = 'https://xueqiu.com/?category=snb_article';
  private filePath = path.resolve(__dirname, '../data/ul.json');
  /**
   * getSmInfo()爬取页面内容
   */
  getSmInfo(html: string) {
    const $ = cheerio.load(html);
    const allContents = $('.AnonymousHome_home__timeline__item_3vU');
    const SmInfos: Sm[] = [];
    allContents.map((index, element) => {
      const title = $(element).find('.AnonymousHome_user-name_3wN').text();
      const descs = $(element).find('h3 a').text() || '内容等待更新' + index;
      SmInfos.push({ title, descs });
    });
    // 加个当前时刻
    return {
      time: new Date().getTime(),
      data: SmInfos,
    };
    // console.log(result);
  }
  // 获取网页的内容，得到字符串
  async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }
  // 文件整合
  generateJsonContent(SmInfo: SmResult) {
    let fileContent: Content = {};
    if (fs.existsSync(this.filePath)) {
      fileContent = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
    }
    fileContent[SmInfo.time] = SmInfo.data;
    return fileContent;
  }
  // 负责写入文件
  writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }
  async initSpiderProcess() {
    const html = await this.getRawHtml();
    const SmInfo = this.getSmInfo(html);
    const fileContent = this.generateJsonContent(SmInfo);
    this.writeFile(JSON.stringify(fileContent));
    // fs.writeFileSync(this.filePath, JSON.stringify(fileContent));
  }
  constructor() {
    this.initSpiderProcess();
  }
}
const crowller = new Crowller();
