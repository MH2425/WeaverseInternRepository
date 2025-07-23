export const prime = (n) => {
  if (n < 1) {
    throw new Error("there is no zeroth prime");
  }
  
  let count = 0;
  let number = 1;

  while (count < n) {
    number++;
    if (isPrime(number)) {
      count++;
    }
  }

  return number;
};

function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
    if (num % i === 0) return false;
  }
  return true;
}