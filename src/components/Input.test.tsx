import { describe, test, expect } from "bun:test";
import Input from "./Input";

describe("Input", () => {
  test("should match snapshot", () => {
    expect(<Input name="test" />).toMatchSnapshot();
  });
});
