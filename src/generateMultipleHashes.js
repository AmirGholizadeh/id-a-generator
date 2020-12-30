const random = require("./random");
module.exports = ({ length, count, keyset, prefix, suffix }) => {
  const hash = [];
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < length; j++) {
      const keys = keyset[random(0, keyset.length)];
      const key = keys[random(0, keys.length)];
      hash[i] = hash[i] ? (hash[i] = hash[i] += key) : (hash[i] = key);
    }
  }
  return hash.map((el) => prefix + el + suffix);
};
