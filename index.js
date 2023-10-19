function promptSplitter({ prompt, splitLength, newLine = false }) {
  if (typeof splitLength != "number") {
    throw new TypeError("splitLength parameter must be of type number.");
  } else if (typeof prompt != "string") {
    throw new TypeError("prompt parameter must be of type string.");
  } else if (typeof newLine != "boolean") {
    throw new TypeError("newLine parameter must be of type boolean.");
  } else if (prompt.length === 0) {
    throw new Error("prompt cannot be empty.");
  } else if (splitLength <= 0) {
    throw new Error("Split length must be greater than 0 characters.");
  }

  prompt = prompt.trim();
  const newLineChar = newLine ? "\n" : " ";

  const size = Math.ceil(prompt.length / splitLength);
  const result = [];

  const intro = `The total length of text I want to send you is too large to send in a single message.${newLineChar}I will now send you the text, and will follow this rule:${newLineChar}${newLineChar}[START PART 1/${size}]${newLineChar}This content will be part 1 out of ${size}.${newLineChar}[END PART 1/${size}]${newLineChar}${newLineChar}Then you will answer: "Received part 1/${size}"${newLineChar}Note: When I tell you "ALL PARTS SENT", then you can process all messages and answer my requests.${newLineChar}`;

  result.push(intro);

  for (let i = 1, ct = 0; i <= size; i++, ct += splitLength) {
    const message = prompt.slice(ct, ct + splitLength).trim();

    let body = `[START PART ${i}/${size}]${newLineChar}${message}${newLineChar}[END PART ${i}/${size}]${newLineChar}`;
    if (i == size) {
      body += `ALL PARTS SENT. You may now continue processing requests`;
    } else {
      body += `Reply with "Received part ${i}/${size}". Remember, do not reply anything else yet and wait for next part.${newLineChar}`;
    }

    result.push(body.trim());
  }

  return result;
}

module.exports = { promptSplitter };
