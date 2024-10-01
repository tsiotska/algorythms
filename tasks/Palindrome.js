/*
https://leetcode.com/problems/palindrome-number/

Given an integer x, return true if x is a palindrome, and false otherwise.
*/

const isPalindrome = (x) => {
  return x.toString().split('').reverse().join('') === x.toString()
};

console.log(isPalindrome(122));
console.log(isPalindrome(121));