/*
Given an array of integers and a target integer,
your task is to return the indices of two numbers in the array that add up to the target.
*/

const twoSum = (numbers, target) => {
  const numsMap = new Map();

  for (let i = 0; i < numbers.length; i++) {
    let matched = numsMap.get(numbers[i]);
    if(matched) return [i, matched];

    numsMap.set(target - numbers[i], i);
  }
}

console.log(twoSum([1, 3, 10, 11, 14], 13))