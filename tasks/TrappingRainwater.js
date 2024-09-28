/*
Given N non-negative integers representing an elevation map where the width of each bar is 1,
compute how much water it can trap after raining.
*/


const trappingRainwater = (array) => {
  let water = 0, head = 0, tail = array.length - 1, maxHeight = 0;

  while (head < tail) {
    const currentHeight = Math.min(array[head], array[tail]);
    if (currentHeight > maxHeight) {
      for (let i = head + 1; i < tail; i++) {
        if (currentHeight <= array[i]) continue;
        water += currentHeight - Math.max(array[i], maxHeight);
      }
      maxHeight = currentHeight
    }

    array[head] > array[tail] ? tail-- : head++;
  }

  return water;
}

console.log(trappingRainwater([4, 2, 0, 3, 2, 5]))