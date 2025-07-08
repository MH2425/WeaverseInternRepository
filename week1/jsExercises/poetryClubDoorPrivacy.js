/**
 * Respond with the correct character, given the line of the
 * poem, if this were said at the front door.
 *
 * @param {string} line
 * @returns {string}
 */
export function frontDoorResponse(line) {
  return line[0];
}

/**
 * Format the password for the front-door, given the response
 * letters.
 *
 * @param {string} word the letters you responded with before
 * @returns {string} the front door password
 */
export function frontDoorPassword(word) {
  return normalize(word);
}

/**
 * Respond with the correct character, given the line of the
 * poem, if this were said at the back door.
 *
 * @param {string} line
 * @returns {string}
 */
export function backDoorResponse(line) {
  let trimLine = line.trim();
  let lastWord = trimLine.slice(-1);
  return lastWord;
}

/**
 * Format the password for the back door, given the response
 * letters.
 *
 * @param {string} word the letters you responded with before
 * @returns {string} the back door password
 */
export function backDoorPassword(word) {
  let firstPart = normalize(word);
  return firstPart + ", please";
}

function normalize(word) {
  let lower = word.toLowerCase();
  let wordWithoutFirstChar = lower.slice(1);
  let frontPassword = word[0].toUpperCase() + wordWithoutFirstChar;
  return frontPassword;
}

function test() {
  console.log(frontDoorResponse("The woods are lovely, dark and deep."));
  console.log(frontDoorPassword("The woods are lovely, dark and deep."));
  console.log(backDoorResponse("The woods are lovely, dark and deep."));
  console.log(backDoorPassword("The woods are lovely, dark and deep."));
}