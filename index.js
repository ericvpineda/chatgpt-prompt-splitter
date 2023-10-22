/* Returns array of string chunks. 
   Parameters:
   - prompt: non-empty string 
   - splitLength: positive integer value that dictates character length of string to split
   - newLine: boolean that appends newline characters. Helpful when printing prompt chunks. 
*/
export default function promptSplitter({ prompt, splitLength, newLine=false }) {

  // Parameter validation
  if (typeof splitLength != "number") {
    throw new TypeError("splitLength parameter must be of type number.");
  } else if (typeof prompt != "string") {
    throw new TypeError("prompt parameter must be of type string.");
  } else if (typeof newLine != "boolean") {
    throw new TypeError("newLine parameter must be of type boolean.");
  } else if (prompt.length === 0) {
    throw new Error("prompt paramter cannot be empty.");
  } else if (splitLength <= 0) {
    throw new Error("splitLength parameter must be greater than 0 characters.");
  }

  prompt = prompt.trim();
  const SIZE = Math.ceil(prompt.length / splitLength);
  const newLineChar = newLine ? "\n" : " ";
  const intro = `The total length of text I want to send you is too large to send in a single message.${newLineChar}I will now send you the text, and will follow this rule:${newLineChar}${newLineChar}[START PART 1/${SIZE}]${newLineChar}This content will be part 1 out of ${SIZE}.${newLineChar}[END PART 1/${SIZE}]${newLineChar}${newLineChar}Then you will answer: "Received part 1/${SIZE}"${newLineChar}Note: When I tell you "ALL PARTS SENT", then you can process all messages and answer my requests.${newLineChar}`;

  // Return array of strings 
  const result = [];
  result.push(intro);

  // Chunk input text into SIZE length
  for (let i = 1, ct = 0; i <= SIZE; i++, ct += splitLength) {
    const message = prompt.slice(ct, ct + splitLength).trim();
    let body = `[START PART ${i}/${SIZE}]${newLineChar}${message}${newLineChar}[END PART ${i}/${SIZE}]${newLineChar}`;
    
    if (i == SIZE) {
      body += `ALL PARTS SENT. You may now continue processing requests`;
    } else {
      body += `Reply with "Received part ${i}/${SIZE}". Remember, do not reply anything else yet and wait for next part.${newLineChar}`;
    }

    result.push(body.trim());
  }

  return result;
}