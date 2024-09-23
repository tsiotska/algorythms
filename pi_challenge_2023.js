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

  console.log(commonFrequency)

  const result = []

  function helper(prefix = "", j = 0) {
    let S = prefix;

    for (let i = j; i < P.length; i++) {
      // Same priority leads to branching
      if (commonFrequency[P[i]] === commonFrequency[Q[i]] && P[i] !== Q[i]) {
        const newPrefixP = S + P[i];
        helper(newPrefixP, i + 1);
      }

      // If more frequent P was not chosen before, then branch
      // OR
      // If less frequent Q is present in both strings and P is not, then branch
      if (commonFrequency[P[i]] > commonFrequency[Q[i]]) {
        console.log(P[i])
        if ((P.slice(0, i).includes(P[i]) && !S.includes(P[i])) || (frequencyP[Q[i]] && !frequencyQ[P[i]])) {
          console.log("loop")
          const newPrefixP = S + Q[i];
          helper(newPrefixP, i + 1);
          return null;
        } else {
          console.log("add")
          S += P[i]
        }
      // If more frequent Q was not chosen before, then branch
      // OR
      // If less frequent P is present in both strings and Q is not, then branch
      } else {
        if ((Q.slice(0, i).includes(Q[i]) && !S.includes(Q[i])) || (frequencyQ[P[i]] && !frequencyP[Q[i]])) {
          const newPrefixP = S + P[i];
          helper(newPrefixP, i + 1);
          return null;
        } else {
          S += Q[i]
        }
      }
    }

    console.log(S)
    result.push(new Set(Array.from(S)).size)
    return result;
  }

  helper()
  return Math.min(...result);
}

const testCases = [["dddabc", "abcefg"]]
// const P = "dddabc", Q = "abcefg" // abcabc - expected (min distinct letters num equals 3)
const P = "aaaacbcddd", Q = "bbbbacdaaa" // aaaacccaaa / aaaaaccaaa- expected (min distinct letters num equals 2)
console.log(solution(P, Q))
/*testCases.forEach((test) => {
  console.log("input:", test)
  console.log("min distinct:", solution(P, Q))
})*/


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
