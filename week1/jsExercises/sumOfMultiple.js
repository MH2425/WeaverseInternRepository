export const sum = (baseValues, level) => {
  const uniqueMultiples = new Set();
  for (let currentNumber = 1; currentNumber < level; currentNumber++) {
    for (let base of baseValues) {
      if (base !== 0 && currentNumber % base === 0) {
        uniqueMultiples.add(currentNumber);
        break;
      }
    }
  }

  let totalEnergy = 0;
  for (let value of uniqueMultiples) {
    totalEnergy += value;
  }
  return totalEnergy;
};