function solution(P, Q) {
  console.log("P")
  console.log(P)
  console.log("Q")
  console.log(Q)
  const commonFrequency = {};
  const frequencyP = {};
  const frequencyQ = {};

  for (let i = 0; i < P.length; i++) {
    frequencyP[P[i]] = (frequencyP[P[i]] || 0) + 1;
    frequencyQ[Q[i]] = (frequencyQ[Q[i]] || 0) + 1;
    if (P[i] === Q[i]) commonFrequency[P[i]] = (commonFrequency[P[i]] || 0) + 1;
    else {
      commonFrequency[P[i]] = (commonFrequency[P[i]] || 0) + 1;
      commonFrequency[Q[i]] = (commonFrequency[Q[i]] || 0) + 1;
    }
  }

  console.log('commonFrequency')
  console.log(commonFrequency)

  const result = []

  function helper(commonFrequency, frequencyP, frequencyQ, prefix = "", j = 0) {
    let S = prefix;
    const commonFrequencyCopy = {...commonFrequency}, frequencyPCopy = {...frequencyP}, frequencyQCopy = {...frequencyQ}

    for (let i = j; i < P.length; i++) {
      if (S.includes(P[i])) {
        S += P[i];
        frequencyQCopy[Q[i]]--;
        commonFrequencyCopy[Q[i]]--;
        continue;
      }
      if (S.includes(Q[i])){
        S += Q[i];
        frequencyQCopy[P[i]]--;
        commonFrequencyCopy[P[i]]--;
        continue;
      }

      // Same priority leads to branching
      if (commonFrequencyCopy[P[i]] === commonFrequencyCopy[Q[i]]) {
        if (P[i] !== Q[i]) {
          const newPrefixP = S + P[i];
          frequencyQCopy[Q[i]]--;
          commonFrequencyCopy[Q[i]]--;
          helper(commonFrequencyCopy, frequencyPCopy, frequencyQCopy, newPrefixP, i + 1);

          const newPrefixQ = S + Q[i];
          frequencyPCopy[P[i]]--;
          commonFrequencyCopy[P[i]]--;
          helper(commonFrequencyCopy, frequencyPCopy, frequencyQCopy, newPrefixQ, i + 1);
          // return null;
        }
        S += Q[i];
        // return null;
      }

      // BRANCH IF less frequent Q is present in both strings while P is not
      // Otherwise use more frequent P
      if (commonFrequencyCopy[P[i]] > commonFrequencyCopy[Q[i]]) {
        if (frequencyPCopy[Q[i]] && !frequencyQCopy[P[i]]) {
          const newPrefixQ = S + Q[i];
          frequencyPCopy[P[i]]--;
          commonFrequencyCopy[P[i]]--;
          helper(commonFrequencyCopy, frequencyPCopy, frequencyQCopy, newPrefixQ, i + 1);
          // return null; // Maybe remove.
        }

        // Add P and remove unused Q from frequency
        S += P[i]
        frequencyQCopy[Q[i]]--;
        commonFrequencyCopy[Q[i]]--;
      }
        // BRANCH IF less frequent P is present in both strings while Q is not
      // Otherwise use more frequent Q
      else {
        if (frequencyQCopy[P[i]] && !frequencyPCopy[Q[i]]) {
          const newPrefixP = S + P[i];
          frequencyQCopy[Q[i]]--;
          commonFrequencyCopy[Q[i]]--;
          helper(commonFrequencyCopy, frequencyPCopy, frequencyQCopy, newPrefixP, i + 1);
          // return null; // Maybe remove.
        }
        // Add Q and remove unused P from frequency
        S += Q[i];
        frequencyPCopy[P[i]]--;
        commonFrequencyCopy[P[i]]--;
      }
    }

    console.log(S)
    result.push(new Set(Array.from(S)).size)
    return result;
  }

  helper(commonFrequency, frequencyP, frequencyQ)
  return Math.min(...result);
}

const P = "aaabbbcccdeh", Q = "befceidejehi" // - expected
console.log(solution(P, Q))

const testCases = [
  ["dddabc", "abcefg"], // abcabc - expected (min distinct letters num equals 3)
  ["aaaacbcddd", "bbbbacdaaa"],
  ["aaabbbcccdeh", "befceidejehi"],
  ["aabbbddeefggi", "dhcgjgifjgijj"]
]

 testCases.forEach((test) => {
  console.log("input:", test)
  console.log("min distinct:", solution(P, Q))
})


/*
function solution(P, Q) {
  console.log("P")
  console.log(P)
  console.log("Q")
  console.log(Q)
  const commonFrequency = {};
  const frequencyP = {};
  const frequencyQ = {};

  for(let i = 0; i < P.length; i++) {
    frequencyP[P[i]] = (frequencyP[P[i]] || 0) + 1;
    frequencyQ[Q[i]] = (frequencyQ[Q[i]] || 0) + 1;
    if(P[i] === Q[i]) commonFrequency[P[i]] = (commonFrequency[P[i]] || 0) + 1;
    else {
      commonFrequency[P[i]] = (commonFrequency[P[i]] || 0) + 1;
      commonFrequency[Q[i]] = (commonFrequency[Q[i]] || 0) + 1;
    }
  }

  console.log(commonFrequency)

  const result = []

  function helper(prefix = "", j = 0) {
    let S = prefix;
    for(let i = j; i < P.length; i++) {
      // Same priority leads to branching
      if(commonFrequency[P[i]] === commonFrequency[Q[i]] && P[i] !== Q[i]) {
        const newPrefixP = S + P[i];
        helper(newPrefixP, i + 1);
      }
      // If letter is less frequent but is  present in both strings then branch
      if(commonFrequency[P[i]] > commonFrequency[Q[i]] && frequencyP[Q[i]] && !frequencyQ[P[i]]) {
        const newPrefixP = S + Q[i];
        helper(newPrefixP, i + 1);
        return null;
      } else if (commonFrequency[Q[i]] > commonFrequency[P[i]] && frequencyQ[P[i]] && !frequencyP[Q[i]]) {
        const newPrefixP = S + P[i];
        helper(newPrefixP, i + 1);
        return null;
      }
      S += commonFrequency[P[i]] > commonFrequency[Q[i]] ? P[i] : Q[i]
    }

    console.log(S)
    result.push(new Set(Array.from(S)).size)
    return result;
  }

  helper()
  return Math.min(...result);
}*/
