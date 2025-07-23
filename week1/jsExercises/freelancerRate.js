/**
 * The day rate, given a rate per hour
 *
 * @param {number} ratePerHour
 * @returns {number} the rate per day
 */
const workingTime = 8;

export function dayRate(ratePerHour) {
  return workingTime * ratePerHour;
}

/**
 * Calculates the number of days in a budget, rounded down
 *
 * @param {number} budget: the total budget
 * @param {number} ratePerHour: the rate per hour
 * @returns {number} the number of days
 */
export function daysInBudget(budget, ratePerHour) {
  return Math.floor(budget / dayRate(ratePerHour));
}

/**
 * Calculates the discounted rate for large projects, rounded up
 *
 * @param {number} ratePerHour
 * @param {number} numDays: number of days the project spans
 * @param {number} discount: for example 20% written as 0.2
 * @returns {number} the rounded up discounted rate
 */
export function priceWithMonthlyDiscount(ratePerHour, numDays, discount) {
  let fullMonths = Math.floor(numDays / 22);
  let remainingDays = numDays % 22;
  let monthlyRate = 22 * dayRate(ratePerHour);
  let discountedMonthlyRate = monthlyRate * (1 - discount);
  let fullMonthsCost = fullMonths * discountedMonthlyRate;
  let remainingDaysCost = remainingDays * dayRate(ratePerHour);
  return Math.ceil(fullMonthsCost + remainingDaysCost);
}