const random = (from, to) => Math.floor(Math.random() * (to - from) + from);
const idGenerator = (config) => {
  // DEAFULT
  let {
    prefix,
    suffix,
    numbers,
    uppercase,
    lowercase = true,
    hashes,
    length,
  } = config;
  prefix = prefix ? prefix : "";
  suffix = suffix ? suffix : "";
  // ERRORS
  // valid length
  if (!length) throw new Error("specify a length");
  if (length <= 0) throw new Error("length must not be equal or lower than 0");
  if (typeof length !== "number")
    throw new Error("type of property length is number");
  // valid prefix and suffix
  if (typeof prefix !== "string")
    throw new Error("type of property prefix is string");
  if (typeof suffix !== "string")
    throw new Error("type of property suffix is string");
  // valid keySets
  if (numbers !== undefined && typeof numbers !== "boolean")
    throw new Error("type of property number is boolean");
  if (uppercase !== undefined && typeof uppercase !== "boolean")
    throw new Error("type of property uppercase is boolean");
  if (lowercase !== undefined && typeof lowercase !== "boolean")
    throw new Error("type of property lowercase is boolean");
  // valid hashes
  if (hashes) {
    if (typeof hashes !== "string" && !Array.isArray(hashes))
      throw new Error(
        "type of property hashes must be string or an array of strings"
      );
    if (Array.isArray(hashes)) {
      if (!hashes.every((el) => typeof el === "string"))
        throw new Error("array hashes must include only string elements");
    }
  }
  // at least one specified keyset
  if (lowercase !== true && uppercase !== true && numbers !== true)
    throw new Error(
      "you should specify at least one key set to generate an ID"
    );
  // KEYSETS
  const lowercaseKeys = [
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
  ];
  const uppercaseKeys = lowercaseKeys.map((el) => el.toUpperCase());
  const numberKeys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const keySets = [];
  // push specified keys to the array
  if (lowercase) keySets.push(lowercaseKeys);
  if (uppercase) keySets.push(uppercaseKeys);
  if (numbers) keySets.push(numberKeys);
  // GENERATE
  let hash = `${prefix}`;
  for (let i = 0; i < length; i++) {
    const keys = keySets[random(0, keySets.length)];
    hash += keys[random(0, keys.length)];
  }
  hash += suffix;
  if (hashes) {
    if (typeof hashes === "string") {
      if (hash === hashes) return idGenerator(config);
    } else {
      if (hashes.includes(hash)) return idGenerator(config);
    }
  }
  return hash;
};
module.exports = idGenerator;
