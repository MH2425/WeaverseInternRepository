export class Crypto {
  constructor(plaintext) {
    this.plaintext = plaintext;
  }

  get ciphertext() {
    // Step 1: Normalize the input
    const normalized = this._normalize(this.plaintext);
    
    if (normalized.length === 0) {
      return '';
    }

    // Step 2: Calculate rectangle dimensions
    const { rows, cols } = this._calculateDimensions(normalized.length);

    // Step 3: Create the rectangle
    const rectangle = this._createRectangle(normalized, rows, cols);

    // Step 4: Read columns and format output
    return this._encodeColumns(rectangle, rows, cols);
  }

  _normalize(text) {
    // Remove spaces, punctuation and convert to lowercase
    return text.toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  _calculateDimensions(length) {
    // Find the smallest c such that r * c >= length, c >= r, and c - r <= 1
    const sqrt = Math.sqrt(length);
    let cols = Math.ceil(sqrt);
    let rows = Math.floor(sqrt);

    // Ensure c >= r and r * c >= length
    while (rows * cols < length) {
      if (cols - rows <= 1) {
        rows++;
      } else {
        cols++;
      }
    }

    // Final adjustment to ensure c - r <= 1
    if (cols - rows > 1) {
      rows = cols - 1;
    }

    return { rows, cols };
  }

  _createRectangle(text, rows, cols) {
    const rectangle = [];
    for (let i = 0; i < rows; i++) {
      const start = i * cols;
      const end = start + cols;
      const row = text.slice(start, end);
      // Pad row with spaces if needed
      rectangle.push(row.padEnd(cols, ' '));
    }
    return rectangle;
  }

  _encodeColumns(rectangle, rows, cols) {
    const chunks = [];
    
    for (let col = 0; col < cols; col++) {
      let chunk = '';
      for (let row = 0; row < rows; row++) {
        chunk += rectangle[row][col];
      }
      chunks.push(chunk);
    }

    return chunks.join(' ');
  }
}
