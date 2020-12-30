const handleErrors = require("./handleErrors");
const generateKeyset = require("./generateKeyset");
const random = require("./random");
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
  // handle errors
  handleErrors(Object.assign({}, config, { lowercase, prefix, suffix }));
  // generate keyset
  const keyset = generateKeyset({ lowercase, uppercase, numbers });
  // GENERATE
  let hash;
  if (count) {
    hash = [];
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < length; j++) {
        const keys = keyset[random(0, keyset.length)];
        const key = keys[random(0, keys.length)];
        hash[i] = hash[i] ? (hash[i] = hash[i] += key) : (hash[i] = key);
      }
    }
    hash.map((el) => prefix + el + suffix);
  } else {
    hash = `${prefix}`;
    for (let i = 0; i < length; i++) {
      const keys = keyset[random(0, keyset.length)];
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
