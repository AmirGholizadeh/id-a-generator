const handleErrors = require("./handleErrors");
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
    count,
  } = config;
  prefix = prefix ? prefix : "";
  suffix = suffix ? suffix : "";
  // HANDLE ERRORS
  handleErrors(Object.assign({}, config, { lowercase, prefix, suffix }));
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

  // let hash = `${prefix}`;
  // for (let i = 0; i < length; i++) {
  //   const keys = keySets[random(0, keySets.length)];
  //   hash += keys[random(0, keys.length)];
  // }
  // hash += suffix;
  let hash;
  if (count) {
    hash = [];
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < length; j++) {
        const keys = keySets[random(0, keySets.length)];
        const key = keys[random(0, keys.length)];
        hash[i] = hash[i] ? (hash[i] = hash[i] += key) : (hash[i] = key);
      }
    }
    hash.map((el) => prefix + el + suffix);
  } else {
    hash = `${prefix}`;
    for (let i = 0; i < length; i++) {
      const keys = keySets[random(0, keySets.length)];
      const key = keys[random(0, keys.length)];
      hash += key;
    }
    hash += suffix;
  }
  if (hashes) {
    if (typeof hashes === "string") {
      if (typeof hash === "string" && hash === hashes)
        return idGenerator(config);
      else if (Array.isArray(hash) && hash.some((el) => el === hashes))
        return idGenerator(config);
    } else {
      if (typeof hash === "string" && hashes.includes(hash))
        return idGenerator(config);
      else if (
        Array.isArray(hash) &&
        hash.some((el) => hashes.some((el2) => el === el2))
      )
        return idGenerator(config);
    }
  }
  return hash;
};
module.exports = idGenerator;
