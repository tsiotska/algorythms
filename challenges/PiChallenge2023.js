// https://app.codility.com/programmers/custom_challenge/pi_challenge_2023/

/*
* Time complexity O(2**A * N)
* Performance 25%
* Correctness 85%
* Time spent - 9 hours
*/

function solution(P, Q) {
  if (P === Q) return new Set(P).size

  const commonFrequencyMap = new Map();
  const frequencyPMap = new Map();
  const frequencyQMap = new Map();

  for (let i = 0; i < P.length; i++) {
    frequencyPMap.set(P[i], (frequencyPMap.get(P[i]) || 0) + 1)
    frequencyQMap.set(Q[i], (frequencyQMap[Q[i]] || 0) + 1);
    commonFrequencyMap.set(P[i], (commonFrequencyMap.get(P[i]) || 0) + 1);
    if (P[i] !== Q[i]) {
      commonFrequencyMap.set(Q[i], (commonFrequencyMap.get(Q[i]) || 0) + 1);
    }
  }

  const result = []

  function branch(S, addLetter, unusedLetter, commonFrequencyMapCopy, i) {
    const newSet = new Set(S);
    newSet.add(addLetter);
    commonFrequencyMapCopy.set(unusedLetter, commonFrequencyMapCopy.get(unusedLetter) - 1);
    helper(commonFrequencyMapCopy, newSet, i + 1);
  }

  function helper(commonFrequency, S, j = 0) {
    const commonFrequencyMapCopy = new Map(commonFrequency);

    for (let i = j; i < P.length; i++) {
      const frequencyQ = commonFrequencyMapCopy.get(Q[i])
      const frequencyP = commonFrequencyMapCopy.get(P[i])

      // Priority for already added letters
      if (S.has(P[i])) {
        S.add(P[i]);
        commonFrequencyMapCopy.set(Q[i], frequencyQ - 1);
        continue;
      }
      if (S.has(Q[i])) {
        S.add(Q[i]);
        commonFrequencyMapCopy.set(P[i], frequencyP - 1);
        continue;
      }

      // Same priority leads to branching
      if (frequencyP === frequencyQ) {
        if (P[i] !== Q[i]) {
          branch(S, P[i], Q[i], commonFrequencyMapCopy, i);
          branch(S, Q[i], P[i], commonFrequencyMapCopy, i);
          return null;
        }

        S.add(Q[i]);
        continue;
      }

      // BRANCH IF less frequent Q is present in both strings while P is not
      // Otherwise use more frequent P
      if (frequencyP > frequencyQ) {
        if (frequencyPMap.get(Q[i]) && !frequencyQMap.get(P[i])) {
          branch(S, Q[i], P[i], commonFrequencyMapCopy, i);
          return null;
        }

        // Add P and remove unused Q from frequency
        S.add(P[i]);
        commonFrequencyMapCopy.set(Q[i], frequencyQ - 1);
      }
      // BRANCH IF less frequent P is present in both strings while Q is not
      // Otherwise use more frequent Q
      else {
        if (frequencyQMap.get(P[i]) && !frequencyPMap.get(Q[i])) {
          branch(S, P[i], Q[i], commonFrequencyMapCopy, i);
          return null;
        }
        // Add Q and remove unused P from frequency
        S.add(Q[i]);
        commonFrequencyMapCopy.set(P[i], frequencyP - 1);
      }
    }
    console.log(S)
    result.push(S.size)
  }

  helper(commonFrequencyMap, new Set())
  return Math.min(...result);
}

const testCases = [
  ["dddabc", "abcefg"], // abcabc - expected (min distinct letters num equals 3)
  ["aaaacbcddd", "bbbbacdaaa"], // aaaaaccaaa - expected (2)
  ["abcdfghiklmnpq", "bcdeghijlmnoqr"], // bbddggiillnnqq - expected (7)
  ["aaabbbcccdeh", "befceidejehi"], // aaaceiccceei expected (4) TODO: cover case
  ["aaaabddddefi", "cghjgeefhjgj"], // aaaagddddjgj - expected (5) TODO: cover case
  ["aabbbddeefggi", "dhcgjgifjgijj"] // aabbbgieegigi - expected (5) TODO: cover case
]

 testCases.forEach((test) => {
  console.log("input:", test)
  console.log("min distinct:", solution(test[0], test[1]))
})
