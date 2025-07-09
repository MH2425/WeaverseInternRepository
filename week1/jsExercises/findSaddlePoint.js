export const saddlePoints = (grid) => {
  let result = [];
  
  if (grid.length === 0 || grid[0].length === 0) {
    return result;
  }
  
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const value = grid[row][col];
      if (
        isTallestInRow(grid, value, row) && 
        isShortestInColumn(grid, value, col)
      ) {
        result.push({row: row + 1, column: col + 1});
      }
    }
  }

  return result;
};

export function isTallestInRow(grid, value, row) {
  return grid[row].every((cell) => value >= cell)
}

export function isShortestInColumn(grid, value, col) {
  return grid.every((row) => value <= row[col])
}