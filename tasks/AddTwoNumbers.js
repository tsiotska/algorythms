/* https://leetcode.com/problems/add-two-numbers/description/

You are given two non-empty linked lists representing two non-negative integers.
The digits are stored in reverse order, and each of their nodes contains a single digit.
Add the two numbers and return the sum as a linked list.
You may assume the two numbers do not contain any leading zero, except the number 0 itself.
*/

function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

var addTwoNumbers = function (l1, l2) {
  const result = new ListNode(0)

  function helper(resultNode, l1Next, l2Next, rest = 0) {
    let {val: l1Val = 0} = l1Next ?? {};
    let {val: l2Val = 0} = l2Next ?? {};


    let value = l1Val + l2Val + rest;
    const withRest = Math.floor(value / 10);
    if (withRest) value %= 10;

    resultNode.val = value;

    if (l1Next?.next || l2Next?.next || withRest) {
      resultNode.next = new ListNode(0);
      helper(resultNode.next, l1Next?.next, l2Next?.next, withRest);
    }
    console.log(resultNode.val);
  }

  helper(result, l1, l2);
  return result;
};