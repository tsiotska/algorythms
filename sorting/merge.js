const mergeSort = (array) => {
  if (array.length <= 1) return array;

  let result = [], leftIndex = 0, rightIndex = 0;
  const leftArray = mergeSort(array.slice(0, Math.floor(array.length / 2)));
  const rightArray = mergeSort(array.slice(Math.floor(array.length / 2)));

  while (leftIndex < leftArray.length || rightIndex < rightArray.length) {
    if (rightIndex >= rightArray.length || (leftIndex < leftArray.length && leftArray[leftIndex] <= rightArray[rightIndex])) {
      result.push(leftArray[leftIndex++]);
    } else {
      result.push(rightArray[rightIndex++]);
    }
  }

  return result;
}

console.log(mergeSort([2, 1, 267, 6, 0, 56, 12, 564, 2, 453]));