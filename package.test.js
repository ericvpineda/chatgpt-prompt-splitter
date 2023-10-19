const {promptSplitter} =  require('./index.js')
const fs = require("fs");

const testFile = fs
  .readFileSync("./utils/berkeley-transcription.txt")
  .toString();

test("Non-string input for prompt should error", () => {
  expect(() => promptSplitter({ prompt: 5, splitLength: 10 })).toThrow(
    TypeError
  );
});

test("Non-number input for splitLength should error", () => {
  expect(() => promptSplitter({ prompt: testFile, splitLength: "10" })).toThrow(
    TypeError
  );
});

test("Non-boolean input for newLine should error", () => {
  expect(() =>
    promptSplitter({ prompt: testFile, splitLength: 10, newLine: "yes" })
  ).toThrow(TypeError);
});

test("Zero length input for prompt should error", () => {
  expect(() => promptSplitter({ prompt: "", splitLength: 10 })).toThrow(Error);
});

test("Non-positive integer input for splitLength should error", () => {
  expect(() => promptSplitter({ prompt: testFile, splitLength: -1 })).toThrow(
    Error
  );
});
test("Non-positive integer input for splitLength should error", () => {
  expect(() => promptSplitter({ prompt: testFile, splitLength: -1 })).toThrow(
    Error
  );
});

test("Non-positive integer input for splitLength should error", () => {
  expect(() => promptSplitter({ prompt: testFile, splitLength: 0 })).toThrow(
    Error
  );
});

test("Correct input parameters should successfully return array of split strings", () => {
    const res = promptSplitter({ prompt: testFile, splitLength: 4000})
    expect(res).toBeInstanceOf(Array)
    expect(typeof res[0]).toBe("string")
})