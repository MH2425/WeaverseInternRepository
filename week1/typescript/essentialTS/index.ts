/**
 * Type annotations & Inference
 */

// Type annotation
function annotation() {
  let name: string = "Alice";
  let age: number = 25;
  let isOnline: boolean = true;
}

// Type Inference
function inference() {
  let city = "Hanoi"; // string
  let score = 99; // number
  let isOnline = true; // boolean
}

/**
 * Interfaces and type aliases
 */
// Interface
interface User {
  name: string;
  age: number;
} // for objects that is expected to extend or implement

const user: User = {
  name: "Bob",
  age: 30
};

type Product = {
  id: number;
  title: string;
}; // for unions, primitives or composition


/**
 * Function types & Generics Basics
 */
// Function type: 
function greet(name: string): string {
  return `Hello, ${name}`;
}

// Arrow function
const add = (a: number, b: number): number => a + b;

//Generic function
function wrapInArray<T>(value: T): T[] {
  return [value];
}

const numArray = wrapInArray(42);
const stringArray = wrapInArray("abc");

/**
 * Union and Intersection types
 */
// Union type
let value: string | number;
value = "Hello";
value = 123;

// Intersection Type
type Person = { name: string };
type Work = { company: string };
type Employee = Person & Work;

const emp: Employee = {
  name: "Jane",
  company: "Rito"
}

/**
 * Enums and Literal Type
 */
// Enum
enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT
};
// constants inside enum types
let dir: Direction = Direction.DOWN;

/**
 * Type Guards and Narrowing
 */
// Type guard with "typeof"
function printId(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed(2));
  }
}

// Type guard with "in"
type Dog = { bark: () => void };
type Cat = { meow: () => void };
function speak(animal: Dog | Cat) {
  if ("bark" in animal) {
    animal.bark;
  } else {
    animal.meow;
  }
}

