function fibs(times) {
  let arr = [];
  for (let i = 0; i < times; i++) {
    arr.push(fibsInner(i));
  }
  const fibsInner = (n) => (n <= 1 ? n : fibs(n - 1) + fibs(n - 2));
  return arr;
}
