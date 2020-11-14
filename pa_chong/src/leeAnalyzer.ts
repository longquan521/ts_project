// 爬取策略分析器文件，比如说要动态爬取不同网站的文件
import { Analyzer } from './crowller';
export default class LeeAnalyzer implements Analyzer {
  // 定于analyze方法,用来做分析
  public analyze(html: string, filePath: string) {
    return html;
  }
}
