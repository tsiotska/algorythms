const mergeKLists =  (lists) => {
  let mainArray = [];

  function addLinkedListToMainArray(subArray) {
    mainArray.push(subArray.val);

    if (subArray.next != null) {
      addLinkedListToMainArray(subArray.next);
    }
  }

  for (let i = 0; i < lists.length; i++) {
    if (lists[i] != null) {
      addLinkedListToMainArray(lists[i]);
    }
  }

  mainArray = mainArray.sort((a, b) => a - b);


  let newList = null;
  for (let i = mainArray.length - 1; i >= 0; i--) {
    newList = new ListNode(mainArray[i], newList);
  }

  return newList;
};