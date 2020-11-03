// cnpm i superagent --save爬虫依赖工具
// cnpm i cheerio --save用来获取页面上的各个部分的内容
// cnpm i @types/cheerio -D 文件变成ts的
// ts直接引用js会报错，ts->.d.ts 翻译文件->js
import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import DellAnalyzer from './dellAnalyzer';

// 定义analyzer的接口类型
export interface Analyzer {
  analyze: (html: string, filePath: string) => {};
}

// 类函数Crowller负责
class Crowller {
  private filePath = path.resolve(__dirname, '../data/ul.json');

  // 获取网页的内容，得到html字符串
  async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  // 负责写入文件
  writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }
  async initSpiderProcess() {
    const html = await this.getRawHtml();
    const fileContent = this.analyzer.analyze(html, this.filePath);
    this.writeFile(fileContent);
  }
  constructor(private url: string, private analyzer: any) {
    this.initSpiderProcess();
  }
}

// 网址单独拿出来
const url = 'https://xueqiu.com/?category=snb_article';
const analyzer = new DellAnalyzer();
new Crowller(url, analyzer);
