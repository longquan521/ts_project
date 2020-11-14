// 爬取策略分析器文件，比如说要动态爬取不同网站的文件
import fs from 'fs';
import cheerio from 'cheerio';
import { Analyzer } from './crowller';
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
export default class DellAnalyzer implements Analyzer {
  // 给个静态名，写单例模式
  private static instance: DellAnalyzer;
  static getInstance() {
    if (!DellAnalyzer.instance) {
      DellAnalyzer.instance = new DellAnalyzer();
    }
    return DellAnalyzer.instance;
  }
  // 整体剪切
  /**
   * getSmInfo()爬取页面内容
   */
  private getSmInfo(html: string) {
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
  }

  // 文件整合
  private generateJsonContent(SmInfo: SmResult, filePath: string) {
    let fileContent: Content = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    fileContent[SmInfo.time] = SmInfo.data;
    return fileContent;
  }

  // 定义analyze方法,用来做分析
  public analyze(html: string, filePath: string) {
    const SmInfo = this.getSmInfo(html);
    const fileContent = this.generateJsonContent(SmInfo, filePath);
    return JSON.stringify(fileContent);
  }

  private constructor() {}
}
