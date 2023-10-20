# Prompt Splitter

## Overview

This module provides a function, `promptSplitter`, which breaks down a given text prompt into smaller chunks for more manageable processing or communication. It is useful when dealing with text that exceeds a certain character length.

## Function Signature

```javascript
/**
 * Returns array of string chunks.
 * 
 * @param {Object} options - An object containing the following parameters:
 *   - prompt: A non-empty string.
 *   - splitLength: A positive integer value that dictates the character length of each string chunk.
 *   - newLine: A boolean that, when true, appends newline characters. Helpful when printing prompt chunks.
 * 
 * @throws {TypeError} if parameters are not of the expected types.
 * @throws {Error} if prompt is empty or splitLength is not a positive integer.
 * 
 * @returns {Array} An array of strings, each representing a part of the original prompt.
 */
function promptSplitter(options) {
  // ... function implementation ...
}
```

## Usage

1. **Parameters**:
   - `prompt` (string): The text to be split.
   - `splitLength` (number): The desired character length for each chunk.
   - `newLine` (boolean, optional): If true, appends newline characters for better readability.

2. **Parameter Validation**:
   - Ensures that parameters meet the expected types and conditions. Throws errors if not.

3. **Output**:
   - Returns an array of strings, each containing a part of the original prompt.

4. **Example**:

```javascript
const { promptSplitter } = require('./promptSplitter');

const options = {
  prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  splitLength: 30,
  newLine: true,
};

const promptChunks = promptSplitter(options);

console.log(promptChunks.join('\n'));
```

## Example Output

```plaintext
The total length of text I want to send you is too large to send in a single message.
I will now send you the text, and will follow this rule:
[START PART 1/2]
This content will be part 1 out of 2.
[END PART 1/2]

Then you will answer: "Received part 1/2"
Note: When I tell you "ALL PARTS SENT", then you can process all messages and answer my requests.

[START PART 2/2]
consectetur adipiscing elit...
[END PART 2/2]
ALL PARTS SENT. You may now continue processing requests
```
