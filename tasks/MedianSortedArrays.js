/*
https://leetcode.com/problems/median-of-two-sorted-arrays/description/

Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).
*/

// [3, 6, 7, 10]
// [2, 4, 6, 11, 12]

// [2, 3, 4, 6, 6, 7, 10, 11, 12]
// 6

const findMedianSortedArrays = (nums1, nums2) => {
  let i = 0, j = 0
  let arranged = Array.from({length: nums1.length + nums2.length}, (_, index) => {
    if(i === nums1.length) return nums2[j++];
    if(j === nums2.length) return nums1[i++];
    return nums1[i] < nums2[j] ? nums1[i++] : nums2[j++];
  });

  if(arranged.length % 2 === 0) return (arranged[arranged.length / 2 - 1] + arranged[arranged.length / 2]) / 2
  return arranged[Math.floor(arranged.length / 2)]
}

const nums1 = [3, 6, 7, 10], nums2 = [2, 4, 6, 11, 12];
// const nums1 = [0, 0], nums2 = [0, 0];
console.log(findMedianSortedArrays(nums1, nums2));