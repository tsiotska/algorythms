/*
https://leetcode.com/problems/regular-expression-matching/description/

Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:

'.' Matches any single character.
'*' Matches zero or more of the preceding element.
The matching should cover the entire input string (not partial).
It is guaranteed for each appearance of the character '*',
there will be a previous valid character to match.
*/

const isMatch = (s, p) => {
  const m = s.length, n = p.length;
  // Create a DP table initialized to false
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(false));

  // Base case: empty string matches empty pattern
  dp[0][0] = true;

  // Handle patterns that can match the empty string (like a*, a*b*c*)
  for (let j = 2; j <= n; j++) {
    if (p[j - 1] === '*') {
      dp[0][j] = dp[0][j - 2];
    }
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] === s[i - 1] || p[j - 1] === '.') {
        // If characters match or pattern has '.', carry over the diagonal value
        dp[i][j] = dp[i - 1][j - 1];
      } else if (p[j - 1] === '*') {
        // If pattern has '*', check two cases:
        // 1. Ignore the 'x*' part (i.e., zero occurrences)
        dp[i][j] = dp[i][j - 2];
        // 2. Use the preceding element if it matches current character in s
        if (p[j - 2] === s[i - 1] || p[j - 2] === '.') {
          dp[i][j] = dp[i][j] || dp[i - 1][j];
        }
      }
    }
  }

  return dp[m][n];
};

const s = "mississippi", p = "mis*is*ip*."
// const s = "aaadad", p = "a*d";
// const s = "aab", p = "c*a*b";
// const s = "abcaadaaabd", p = ".*aa.*d";

console.log(isMatch(s, p));