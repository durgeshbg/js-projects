// function sumRange(n) {
//     if(n == 1) return 1;
//     else return n + sumRange(n-1)
// }
// console.log(sumRange(3)); // 1 + 2 + 3 = 6

// function fact(n) {
//   if (n == 1 || n == 0) return 1;
//   else return n * fact(n - 1);
// }
// console.log(fact(6)); // 720

// function all(arr, cb) {
//   if (cb(arr.pop())) {
//     if (arr.length == 0) return true;
//     return all(arr, cb);
//   } else return false;
// }
// let allAreLessThanSeven = all([1,2,3,9], function (num) {
//   return num < 7;
// });
// console.log(allAreLessThanSeven); // false

// function totalIntegers(arr, total = 0) {
//   for (let i = 0; i < arr.length; i++) {
//     if (Array.isArray(arr[i])) total += totalIntegers(arr[i]);
//     else if (typeof arr[i] == 'number') total += 1;
//   }
//   return total;
// }
// let seven = totalIntegers([[[5], 3], 0, 2, ['foo'], [], [4, [5, 6]]]); // 7
// console.log(seven);

// function sumSquares(arr, sum = 0) {
//   for (let i = 0; i < arr.length; i++) {
//     if (Array.isArray(arr[i])) sum += sumSquares(arr[i]);
//     else if (typeof arr[i] == 'number') sum += arr[i] * arr[i];
//   }
//   return sum;
// }
// const l = [1,2,3];
// console.log(sumSquares(l));

// function replicate(n, i) {
//   if (n <= 0) return [];
//   else return [...replicate(n - 1, i), i];
// }
// console.log(replicate(3, 5)); // [5, 5, 5]

function fibsRec(n, i = 0, a = []) {
  if (n == 0) return a;
  else {
    if (i < 2) a.push(i);
    else a.push(a[i - 2] + a[i - 1]);
  }
  return fibsRec(n - 1, i + 1, a);
}
console.log(fibsRec(5)); // [ 0, 1, 1, 2, 3 ]
