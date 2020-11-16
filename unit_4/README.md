# 语法进阶

#### 了解 `tsconfig.json` 作用

- 运行 tsc -demo1.ts 不会执行 tsconfig.json 的配置
- 直接运行 tsc 会执行 tsconfig.json 的配置

#### 如果只想编译特定的文件，在 tsconfig.json 中添加 include(包含) || exclude(不包含) || files(文件名)

- "files"指定一个包含相对或绝对文件路径的列表。 "include"和"exclude"属性指定一个文件 glob 匹配模式列表。 支持的 glob 通配符有：

  - \* 匹配 0 或多个字符（不包括目录分隔符）
  - ? 匹配一个任意字符（不包括目录分隔符）
  - \*\*/ 递归匹配任意子目录

```
{
  "include": ["./demo.ts"],
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    /* Basic Options */
    // "incremental": true,                   /* Enable incremental compilation */
    "target": "es5",
    ...
  }
}
```
