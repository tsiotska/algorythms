/*
https://leetcode.com/problems/regular-expression-matching/description/

Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:

'.' Matches any single character.
'*' Matches zero or more of the preceding element.
The matching should cover the entire input string (not partial).
It is guaranteed for each appearance of the character '*',
there will be a previous valid character to match.
*/

const isMatch = (string, pattern) => {
  if (!pattern.includes("*") && pattern.length !== string.length) return false

  let index = 0;
  for (let patternIndex = 0; patternIndex < pattern.length; patternIndex++) {
    const currentPattern = pattern[patternIndex];

    if (currentPattern === "*") {
      // Same symbol or any symbol 1 or more times
      while (string[index - 1] === string[index] || (pattern[patternIndex - 1] === "." && !pattern[patternIndex + 1])) {
        index++;
      }
      // Skip it as 0 times. Continue with the same symbol.
      continue;
    }

    if (currentPattern === ".") {
      index++;
      continue;
    }

    // Take next symbol if pattern strictly equals
    if (currentPattern === string[index]) {
      index++;
    } else if (pattern[patternIndex + 1] !== "*") {
      return false;
    }
  }

  return index === string.length;
}

// const s = "mississippi", p = "mis*is*ip*."
// const s = "aaadad", p = "a*d";
// const s = "aab", p = "c*a*b";
const s = "abcdaaabc", p = ".*aa.*";

console.log(isMatch(s, p));