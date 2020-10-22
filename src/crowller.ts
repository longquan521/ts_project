// cnpm i superagent --save爬虫依赖工具
// ts直接引用js会报错，ts->.d.ts 翻译文件->js
import superagent from 'superagent';
class Crowller {
  private secret = 'secretKey';
  url = 'https://longquan521.github.io/index.html';
  private rawHtml = '';
  async getRawHtml() {
    const result = await superagent.get(this.url);
    console.log(result.text);
    this.rawHtml = result.text;
  }
  constructor() {
    this.getRawHtml();
  }
}
const crowller = new Crowller();
