import { describe, expect, test } from "vitest";
import { cleanInput } from "./repl";

describe.each([
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: "  testing  something   ",
    expected: ["testing", "something"]
  },
  {
    input: "no whitespaces here",
    expected: ["no", "whitespaces", "here"]
  }
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    // TODO: call cleanInput with the input here
    const result = cleanInput(input);
    // The `expect` and `toHaveLength` functions are from vitest
    // they will fail the test if the condition is not met
    expect(result).toHaveLength(expected.length);
    for (const i in expected) {
      // likewise, the `toBe` function will fail the test if the values are not equal
      expect(result[i]).toBe(expected[i]);
    }
  });
});