export class Change {
  calculate(coinArray, target) {
    // Handle negative target
    if (target < 0) {
      throw new Error('Negative totals are not allowed.');
    }
    
    // Handle target of 0
    if (target === 0) {
      return [];
    }

    const result = this.minCoinRecur(0, coinArray, target, []);
    
    // If no solution found, throw error
    if (result === null) {
      throw new Error(`The total ${target} cannot be represented in the given currency.`);
    }
    
    return result;
  }

  minCoinRecur(i, coinArray, target, currentCoins) {
    if (target === 0) {
      return [...currentCoins];
    }

    if (target < 0 || i === coinArray.length) {
      return null;
    }

    // Take current coin (if possible)
    let takeResult = null;
    if (coinArray[i] > 0 && coinArray[i] <= target) {
      takeResult = this.minCoinRecur(i, coinArray, target - coinArray[i], [...currentCoins, coinArray[i]]);
    }

    // Skip current coin
    let skipResult = this.minCoinRecur(i + 1, coinArray, target, currentCoins);

    // Return the solution with fewer coins
    if (takeResult === null) return skipResult;
    if (skipResult === null) return takeResult;
    
    return takeResult.length <= skipResult.length ? takeResult : skipResult;
  }
}