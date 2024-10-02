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
  // Backtracking function
  const backtrackingHelper = (row, col) => {
    // If we reach the end of the board it's solved
    if (row === 9) return true;

    const [nextRow, nextCol] = col + 1 === 9 ? [row + 1, 0] : [row, col + 1];

    // If the current cell is already filled, move to the next cell
    if (board[row][col] !== ".") {
      return backtrackingHelper(nextRow, nextCol);
    }

    // Attempt to place numbers in the empty cell
    for (let num = 1; num <= 9; num++) {
      const stringifiedNum = num.toString();
      if (isValid(board, row, col, stringifiedNum)) {
        board[row][col] = stringifiedNum;

        // Attempt to solve the next cell
        if (backtrackingHelper(nextRow, nextCol)) return true;

        // If the next solution can't be found, undo and continue loop
        board[row][col] = ".";
      }
    }

    // Backtracking if no solution
    return false;
  };

  backtrackingHelper(0, 0);
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

