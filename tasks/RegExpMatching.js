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

  let patternIndex = 0;
  for (let index in string) {
    if (pattern[patternIndex] === "*") {
      if (string[index - 1] === string[index] || (pattern[patternIndex - 1] === ".")) {
        continue;
      }
      patternIndex++;
    }

    if (pattern[patternIndex] === ".") {
      patternIndex++;
      continue;
    }

    if (pattern[patternIndex] !== string[index] && pattern[patternIndex + 1] !== "*") {
      return false;
    } else {
      patternIndex++;
    }
  }

  return patternIndex === pattern.length - 1;
}

const s = "aaadc", p = "a*.c";
console.log(isMatch(s, p));