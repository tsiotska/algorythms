/*
* Time complexity O(2**A * N)
* Performance 25%
* Correctness 85%
* Time spent - 9 hours
*/

function solution(P, Q) {
  if (P === Q) return new Set(P).size

  const commonFrequency = new Map();
  const frequencyP = new Map();
  const frequencyQ = new Map();

  for (let i = 0; i < P.length; i++) {
    frequencyP.set(P[i], (frequencyP.get(P[i]) || 0) + 1)
    frequencyQ.set(Q[i], (frequencyQ[Q[i]] || 0) + 1);
    if (P[i] === Q[i]) commonFrequency.set(P[i], (commonFrequency.get(P[i]) || 0) + 1);
    else {
      commonFrequency.set(P[i], (commonFrequency.get(P[i]) || 0) + 1);
      commonFrequency.set(Q[i], (commonFrequency.get(Q[i]) || 0) + 1);
    }
  }

  const result = []

  function branch(S, addLetter, unusedLetter, frequencyPCopy, frequencyQCopy, commonFrequencyCopy, i) {
    const newSet = new Set(S);
    newSet.add(addLetter);
    frequencyPCopy.set(unusedLetter, frequencyPCopy.get(unusedLetter) - 1);
    commonFrequencyCopy.set(unusedLetter, commonFrequencyCopy.get(unusedLetter) - 1);
    helper(commonFrequencyCopy, frequencyPCopy, frequencyQCopy, S, i + 1);
  }

  function helper(commonFrequency, frequencyP, frequencyQ, S, j = 0) {
    const commonFrequencyCopy = new Map(commonFrequency),
      frequencyPCopy = new Map(frequencyP),
      frequencyQCopy = new Map(frequencyQ);

    for (let i = j; i < P.length; i++) {
      // Priority for already added letters
      if (S.has(P[i])) {
        S.add(P[i]);
        frequencyQCopy.set(Q[i], frequencyQCopy.get(Q[i]) - 1);
        commonFrequencyCopy.set(Q[i], commonFrequencyCopy.get(Q[i]) - 1);
        continue;
      }
      if (S.has(Q[i])) {
        S.add(Q[i]);
        frequencyQCopy.set(P[i], frequencyQCopy.get(P[i]) - 1);
        commonFrequencyCopy.set(P[i], commonFrequencyCopy.get(P[i]) - 1);
        continue;
      }

      // Same priority leads to branching
      if (commonFrequencyCopy.get(P[i]) === commonFrequencyCopy.get(Q[i])) {
        if (P[i] !== Q[i]) {
          branch(S, P[i], Q[i], frequencyPCopy, frequencyQCopy, commonFrequencyCopy, i);
          branch(S, Q[i], P[i], frequencyPCopy, frequencyQCopy, commonFrequencyCopy, i);
          return null;
        }

        S.add(Q[i]);
        continue;
      }

      // BRANCH IF less frequent Q is present in both strings while P is not
      // Otherwise use more frequent P
      if (commonFrequencyCopy.get(P[i]) > commonFrequencyCopy.get(Q[i])) {
        if (frequencyPCopy.get(Q[i]) && !frequencyQCopy.get(P[i])) {
          branch(S, Q[i], P[i], frequencyPCopy, frequencyQCopy, commonFrequencyCopy, i);
          return null;
        }

        // Add P and remove unused Q from frequency
        S.add(P[i]);
        frequencyQCopy.set(Q[i], frequencyQCopy.get(Q[i]) - 1);
        commonFrequencyCopy.set(Q[i], commonFrequencyCopy.get(Q[i]) - 1);
      }
        // BRANCH IF less frequent P is present in both strings while Q is not
      // Otherwise use more frequent Q
      else {
        if (frequencyQCopy.get(P[i]) && !frequencyPCopy.get(Q[i])) {
          branch(S, P[i], Q[i], frequencyPCopy, frequencyQCopy, commonFrequencyCopy, i);
          return null;
        }
        // Add Q and remove unused P from frequency
        S.add(Q[i]);
        frequencyPCopy.set(P[i], frequencyPCopy.get(P[i]) - 1);
        commonFrequencyCopy.set(P[i], commonFrequencyCopy.get(P[i]) - 1);
      }
    }
    console.log(S)
    result.push(S.size)
  }

  helper(commonFrequency, frequencyP, frequencyQ, new Set())
  return Math.min(...result);
}

const testCases = [
  ["dddabc", "abcefg"], // abcabc - expected (min distinct letters num equals 3)
  ["aaaacbcddd", "bbbbacdaaa"], // aaaaaccaaa - expected (2)
  ["abcdfghiklmnpq", "bcdeghijlmnoqr"], // bbddggiillnnqq - expected (7)
  ["aaabbbcccdeh", "befceidejehi"], // expected (4) TODO: cover case
  ["aaaabddddefi", "cghjgeefhjgj"], // aaaagddddjgj - expected (5) TODO: cover case
  ["aabbbddeefggi", "dhcgjgifjgijj"]
]

 testCases.forEach((test) => {
  console.log("input:", test)
  console.log("min distinct:", solution(test[0], test[1]))
})
