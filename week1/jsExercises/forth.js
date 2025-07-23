export class Forth {
  constructor() {
    this._stack = [];
    this._definitions = new Map();
    this._initializeBuiltins();
  }

  _initializeBuiltins() {
    // Arithmetic operations
    this._definitions.set('+', () => {
      if (this._stack.length < 2) {
        if (this._stack.length === 1) {
          throw new Error('Only one value on the stack');
        }
        throw new Error('Stack empty');
      }
      const b = this._stack.pop();
      const a = this._stack.pop();
      this._stack.push(a + b);
    });

    this._definitions.set('-', () => {
      if (this._stack.length < 2) {
        if (this._stack.length === 1) {
          throw new Error('Only one value on the stack');
        }
        throw new Error('Stack empty');
      }
      const b = this._stack.pop();
      const a = this._stack.pop();
      this._stack.push(a - b);
    });

    this._definitions.set('*', () => {
      if (this._stack.length < 2) {
        if (this._stack.length === 1) {
          throw new Error('Only one value on the stack');
        }
        throw new Error('Stack empty');
      }
      const b = this._stack.pop();
      const a = this._stack.pop();
      this._stack.push(a * b);
    });

    this._definitions.set('/', () => {
      if (this._stack.length < 2) {
        if (this._stack.length === 1) {
          throw new Error('Only one value on the stack');
        }
        throw new Error('Stack empty');
      }
      const b = this._stack.pop();
      const a = this._stack.pop();
      if (b === 0) throw new Error('Division by zero');
      this._stack.push(Math.floor(a / b));
    });

    // Stack manipulation operations
    this._definitions.set('dup', () => {
      if (this._stack.length === 0) {
        throw new Error('Stack empty');
      }
      const top = this._stack[this._stack.length - 1];
      this._stack.push(top);
    });

    this._definitions.set('drop', () => {
      if (this._stack.length === 0) {
        throw new Error('Stack empty');
      }
      this._stack.pop();
    });

    this._definitions.set('swap', () => {
      if (this._stack.length < 2) {
        if (this._stack.length === 1) {
          throw new Error('Only one value on the stack');
        }
        throw new Error('Stack empty');
      }
      const b = this._stack.pop();
      const a = this._stack.pop();
      this._stack.push(b);
      this._stack.push(a);
    });

    this._definitions.set('over', () => {
      if (this._stack.length < 2) {
        if (this._stack.length === 1) {
          throw new Error('Only one value on the stack');
        }
        throw new Error('Stack empty');
      }
      const second = this._stack[this._stack.length - 2];
      this._stack.push(second);
    });
  }

  evaluate(input) {
    const tokens = this._tokenize(input);
    this._processTokens(tokens);
  }

  _tokenize(input) {
    return input.trim().split(/\s+/).filter(token => token.length > 0);
  }

  _processTokens(tokens) {
    let i = 0;
    while (i < tokens.length) {
      const token = tokens[i].toLowerCase();

      if (token === ':') {
        i = this._defineWord(tokens, i);
      } else {
        this._processToken(token);
        i++;
      }
    }
  }

  _defineWord(tokens, startIndex) {
  let endIndex = -1;
  for (let i = startIndex + 1; i < tokens.length; i++) {
    if (tokens[i] === ';') {
      endIndex = i;
      break;
    }
  }

  if (endIndex === -1) {
    throw new Error('Word definition is not terminated');
  }

  if (endIndex - startIndex < 2) {
    throw new Error('Word definition is empty');
  }

  const wordName = tokens[startIndex + 1].toLowerCase();
  
  if (this._isNumber(wordName)) {
    throw new Error('Invalid definition');
  }

  const definitionTokens = tokens.slice(startIndex + 2, endIndex)
    .map(token => token.toLowerCase());

  // Capture current definitions at the time of word definition
  const capturedDefinitions = new Map();
  for (const token of definitionTokens) {
    if (this._definitions.has(token) && !this._isNumber(token)) {
      // Create a closure that captures the current definition
      const currentDef = this._definitions.get(token);
      capturedDefinitions.set(token, () => currentDef());
    }
  }

  // Create the word definition function
  this._definitions.set(wordName, () => {
    // Process tokens with captured definitions
    for (const token of definitionTokens) {
      if (this._isNumber(token)) {
        this._stack.push(parseInt(token, 10));
      } else if (capturedDefinitions.has(token)) {
        // Use captured definition
        capturedDefinitions.get(token)();
      } else if (this._definitions.has(token)) {
        // Use current definition for built-ins and other words
        this._definitions.get(token)();
      } else {
        throw new Error(`Unknown word: ${token}`);
      }
    }
  });

  return endIndex + 1;
}

  _processToken(token) {
    if (this._isNumber(token)) {
      this._stack.push(parseInt(token, 10));
    } else if (this._definitions.has(token)) {
      this._definitions.get(token)();
    } else {
      throw new Error(`Unknown command`);
    }
  }

  _isNumber(token) {
    return /^-?\d+$/.test(token);
  }

  get stack() {
    return [...this._stack];
  }
}