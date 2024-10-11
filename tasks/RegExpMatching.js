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
    const currentPattern = pattern[patternIndex]
    if (currentPattern === "*") {
      if (string[index - 1] === string[index]) {
        continue;
      }
      patternIndex++;
    }

    if (currentPattern === ".") {
      patternIndex++;
      continue;
    }

    if (currentPattern !== string[index]) {
      return false;
    }

    patternIndex++;
  }

  return true;
}

const s = "aaadc", p = "a*.c";
console.log(isMatch(s, p));