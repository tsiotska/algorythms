/*
https://leetcode.com/problems/sudoku-solver/description/

Write a program to solve a Sudoku puzzle by filling the empty cells.

A sudoku solution must satisfy all of the following rules:

Each of the digits 1-9 must occur exactly once in each row.
Each of the digits 1-9 must occur exactly once in each column.
Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
The '.' character indicates empty cells.
*/

const isValid = (board, row, col, num) => {
  for (let i = 0; i < 9; i++) {
    const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const n = 3 * Math.floor(col / 3) + i % 3;
    if (board[row][i] === num || board[i][col] === num || board[m][n] === num) return false;
  }
  return true;
};

const solveSudoku = (board) => {
  // Backtracking function to solve the board
  const backtrackingHelper = (board, nextRow, nextCol) => {
    for (let row = nextRow; row < 9; row++) {
      for (let col =  (row === nextRow ? nextCol : 0); col < 9; col++) {
        // Find an empty cell
        if (board[row][col] === ".") {
          // Attempt to find num that is not present in row/col/grid
          for (let num = 1; num <= 9; num++) {
            const stringifiedNum = num.toString();

            if (isValid(board, row, col, stringifiedNum)) {
              board[row][col] = stringifiedNum;

              const [nextRow, nextCol] = col + 1 === 9 ? [row + 1, 0] : [row, col + 1];
              if (backtrackingHelper(board, nextRow, nextCol)) return true;
              board[row][col] = ".";
            }
          }
          // If not found any match then backtrack
          return false;
        }
      }
    }
    return true;  // Solution found
  };

  backtrackingHelper(board, 0, 0);
};

const printBoard = (board) => {
  board.forEach(row => console.log(row.join(' ')));
};

const board = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"]
]

solveSudoku(board);
printBoard(board);

