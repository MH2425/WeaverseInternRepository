export class InvalidInputError extends Error {
  constructor(message) {
    super(message || 'Invalid Input');
    this.name = 'InvalidInputError';
  }
}

const DIRECTIONS = ['north', 'east', 'south', 'west'];

export class Robot {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.direction = 'north';
  }

  get bearing() {
    return this.direction;
  }

  get coordinates() {
    return [this.x, this.y];
  }

  place({ x, y, direction }) {
    if (!DIRECTIONS.includes(direction)) {
      throw new InvalidInputError('Invalid direction');
    }
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  turnRight() {
    const currentIndex = DIRECTIONS.indexOf(this.direction);
    this.direction = DIRECTIONS[(currentIndex + 1) % 4];
  }

  turnLeft() {
    const currentIndex = DIRECTIONS.indexOf(this.direction);
    this.direction = DIRECTIONS[(currentIndex + 3) % 4]; // or (index - 1 + 4) % 4
  }

  advance() {
    switch (this.direction) {
      case 'north':
        this.y += 1;
        break;
      case 'south':
        this.y -= 1;
        break;
      case 'east':
        this.x += 1;
        break;
      case 'west':
        this.x -= 1;
        break;
    }
  }

  evaluate(instructions) {
    for (const char of instructions) {
      switch (char) {
        case 'R':
          this.turnRight();
          break;
        case 'L':
          this.turnLeft();
          break;
        case 'A':
          this.advance();
          break;
        default:
          throw new InvalidInputError(`Unknown instruction: ${char}`);
      }
    }
  }
}