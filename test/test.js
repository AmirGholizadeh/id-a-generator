const idGenerator = require("./../dist/idGenerator");

describe("it should return a valid value", () => {
  const hash = idGenerator({ length: 4 });
  it("shouldnt return null", () => {
    expect(hash).not.toBeNull();
  });
  it("shouldnt be falsy", () => {
    expect(hash).not.toBeFalsy();
  });
  it("shouldnt be undefined", () => {
    expect(hash).toBeDefined();
  });
});

describe("it should return a X length string", () => {
  it("should return a 4 length string", () => {
    const length = idGenerator({ length: 4 }).length;
    expect(length).toBe(4);
  });
  it("should return a 10 length string", () => {
    const length = idGenerator({ length: 10 }).length;
    expect(length).toBe(10);
  });
  it("should return a 158 length string", () => {
    const length = idGenerator({ length: 158 }).length;
    expect(length).toBe(158);
  });
});

it("should return a unique id", () => {
  const unique = idGenerator({
    length: 1,
    numbers: true,
    lowercase: false,
    hashes: ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
  });
  expect(unique).toBe("9");
});

describe("it should throw errors", () => {
  // property types
  const msgGen = (property, type) => `type of property ${property} is ${type}`;
  it("lowercase property type", () => {
    expect(() => idGenerator({ length: 4, lowercase: "h" })).toThrow(
      msgGen("lowercase", "boolean")
    );
  });
  it("should check uppercase property type", () => {
    expect(() => idGenerator({ length: 4, uppercase: "h" })).toThrow(
      msgGen("uppercase", "boolean")
    );
  });
  it("should check prefix property type", () => {
    expect(() => idGenerator({ length: 4, prefix: 1 })).toThrow(
      msgGen("prefix", "string")
    );
  });
  it("should check suffix property type", () => {
    expect(() => idGenerator({ length: 4, suffix: 1 })).toThrow(
      msgGen("suffix", "string")
    );
  });
  it("should check numbers property type", () => {
    expect(() => idGenerator({ length: 4, numbers: "h" })).toThrow(
      msgGen("numbers", "boolean")
    );
  });
  it("should check hashes property type", () => {
    expect(() => idGenerator({ length: 4, hashes: 1 })).toThrow(
      "type of property hashes must be string or an array of strings"
    );
  });
  it("should check length property type", () => {
    expect(() => idGenerator({ length: "4" })).toThrow(
      msgGen("length", "number")
    );
  });
  it("should check count property type", () => {
    expect(() => idGenerator({ length: 4, count: true })).toThrow(
      msgGen("count", "number")
    );
  });
  // length related
  it("should check length is not less than 0", () => {
    expect(() => idGenerator({ length: -1 })).toThrow(
      "length must not be equal or lower than 0"
    );
  });
  it("should check length is specified", () => {
    expect(() => idGenerator({})).toThrow("specify a length");
  });
  // hashes related
  it("should check hashes array includes only strings", () => {
    expect(() =>
      idGenerator({ length: 4, hashes: [23, "testing", true, "a hash"] })
    ).toThrow("array hashes must include only string elements");
  });
  // keyset related
  it("should check at least one keyset is specified", () => {
    // lowercase is true by default
    expect(() => idGenerator({ length: 4, lowercase: false })).toThrow(
      "you should specify at least one key set to generate an ID"
    );
  });
  // count related
  it("should check count is not less than 0", () => {
    expect(() => idGenerator({ length: 4, count: -4 })).toThrow(
      "count must not be equal or lower than 0"
    );
  });
});

describe("play with options", () => {
  it("should return a 4 length lowercase hash", () => {
    const hash = idGenerator({ length: 4 });
    expect(hash.match(/[A-Z]|\d/)).toBeNull();
    expect(hash.length).toBe(4);
  });
  it("should return a 10 length uppercase hash", () => {
    const hash = idGenerator({ length: 10, uppercase: true, lowercase: false });
    expect(hash.match(/[a-z]|\d/)).toBeNull();
    expect(hash.length).toBe(10);
  });
  it("should return a 5 length lowercase and uppercase hash", () => {
    const hash = idGenerator({ length: 5, uppercase: true });
    expect(hash.match(/\d/)).toBeNull();
    expect(hash.match(/[a-z]/)).not.toBeNull();
    expect(hash.match(/[A-Z]/)).not.toBeNull();
    expect(hash.length).toBe(5);
  });
  it("should return a 1 length number", () => {
    const hash = idGenerator({ length: 1, numbers: true, lowercase: false });
    expect(hash.match(/\d/)).not.toBeNull();
    expect(hash.match(/[A-z]/)).toBeNull();
    expect(hash.length).toBe(1);
  });
  it("should return 5 hashes of 10 length lowercase and uppercase", () => {
    const hashes = idGenerator({ length: 10, count: 5, uppercase: true });
    expect(Array.isArray(hashes)).toBeTruthy();
    expect(hashes.length).toBe(5);
    const checkLetters = () => {
      hashes.every((hash) => {
        if (
          hash.match(/[A-Z]/) &&
          hash.match(/[a-z]/ && !hash.match(/\d/ && hash.length === 5))
        )
          return true;
        return false;
      });
    };
    expect(checkLetters).toBeTruthy();
  });
});
