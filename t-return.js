class ClassWithStaticMethod {
  static staticProperty = '2 x 2 = 4';
  static staticMethod(n = 2) {
    return `${n} x ${n} = ${n * n}`;
  }
}
console.log(ClassWithStaticMethod.staticProperty);
//Result -> 2 x 2 = 4
console.log(ClassWithStaticMethod.staticMethod(2));
//Result -> 2 x 2 = 4
