export const isValid = (inputStr) => {
  const sanitized = inputStr.replace(/-/g, '');

  if (sanitized.length !== 10) return false;

  let sum = 0;

  for (let i = 0; i < 10; i++) {
    let char = sanitized[i];
    let value;

    if (char === 'X') {
      if (i !== 9) return false;
      value = 10;
    } else if (char >= '0' && char <= '9') {
      value = parseInt(char);
    } else {
      return false; 
    }

    sum += value * (10 - i);
  }

  return sum % 11 === 0;
};