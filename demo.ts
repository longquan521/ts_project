/**
 * 10.22
 **/
// // getter and setter
// // class Person {
// //   constructor(private _name: String) {}
// //   get name() {
// //     return this._name + ' lee';
// //   }
// //   set name(name: string) {
// //     const realName = name.split(' ')[0];
// //     this._name = realName;
// //   }
// // }
// // const person = new Person('dell');
// // console.log(person.name);
// // person.name = 'dell lee';
// // console.log(person.name);

// // 单例模式,只能生成一个实例
// class Demo {
//   private static instance: Demo;
//   private constructor(public name: string) {}
//   //static是直接挂在类上面，而不是挂在实例上
//   static getInstance() {
//     if (!this.instance) {
//       this.instance = new Demo('dell lee');
//     }
//     return this.instance;
//   }
// }
// // demo1和demo2就相等了
// const demo1 = Demo.getInstance();
// const demo2 = Demo.getInstance();
// console.log(demo1 === demo2); //true
// console.log(demo1.name);
// console.log(demo2.name);
