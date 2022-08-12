const arr = [3, 2, 1];
console.log(mergeSort(arr));

function mergeSort(arr) {
  if (arr.length === 1) return arr;

  let left = arr.slice(0, Math.floor(arr.length / 2));
  let right = arr.slice(Math.floor(arr.length / 2));

  let sortedLeft = mergeSort(left);
  let sortedRight = mergeSort(right);

  let mergedArr = [];

  while (sortedLeft[0] && sortedRight[0]) {
    sortedLeft[0] < sortedRight[0]
      ? mergedArr.push(sortedLeft.shift())
      : mergedArr.push(sortedRight.shift());
  }

  mergedArr.push(...sortedLeft.concat(sortedRight));
  return mergedArr;
}
