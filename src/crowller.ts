// cnpm i superagent --save爬虫依赖工具
// cnpm i cheerio --save用来获取页面上的各个部分的内容
// cnpm i @types/cheerio -D 文件变成ts的
// ts直接引用js会报错，ts->.d.ts 翻译文件->js
import superagent from 'superagent';
import cheerio from 'cheerio';
class Crowller {
  private secret = 'secretKey';
  // url = 'https://longquan521.github.io/index.html';
  url = 'https://xueqiu.com/?category=snb_article';
  private rawHtml = '';
  getSmInfo(html: string) {
    const $ = cheerio.load(html);
    const ulli = $('.AnonymousHome_home__timeline__item_3vU');
    console.log('++++++++++++', ulli.length);
    ulli.map((index, element) => {
      const title = $(element).find('.AnonymousHome_user-name_3wN');
      const descs = $(element).find('h3 a');
      console.log(title.text(), '++++', descs.text());
    });
  }
  async getRawHtml() {
    const result = await superagent.get(this.url);
    this.getSmInfo(result.text);
  }
  constructor() {
    this.getRawHtml();
  }
}
const crowller = new Crowller();
