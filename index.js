export const promptSplitter = ({ text, splitLength }) => {

  if (text.length === 0) {
    throw new Error("Text cannot be empty.");
  } else if (splitLength === 0) {
    throw new Error("Split length must be greater than 0 characters.");
  }

  text = text.trim();

  const size = Math.ceil(text.length / splitLength);
  const result = [];

  const intro = `The total length of text I want to send you is too large to send in a single message.\nI will now send you the text, and will follow this rule:\n\n[START PART 1/${size}]\nThis content will be part 1 out of ${size}.\n[END PART 1/${size}]\n\nThen you will answer: "Received part 1/${size}"\nNote: When I tell you "ALL PARTS SENT", then you can process all messages and answer my requests.\n`;

  result.push(intro);

  for (let i = 1, ct = 0; i <= size; i++, ct += splitLength) {

    const message = text.slice(ct, ct + splitLength).trim()

    let body = `[START PART ${i}/${size}]\n${message}\n[END PART ${i}/${size}]\n`;
    if (i == size) {
      body += `ALL PARTS SENT. You may now continue processing requests`;
    } else {
      body += `Reply with "Received part ${i}/${size}". Remember, do not reply anything else yet and wait for next part.\n`;
    }
    result.push(body);
  }

  return result;
};

