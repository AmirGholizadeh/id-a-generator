const random = require("./../utils/random");
module.exports = ({ prefix, suffix, length, keyset }) => {
  let hash = "";
  for (let i = 0; i < length; i++) {
    const keys = keyset[random(0, keyset.length)];
    const key = keys[random(0, keys.length)];
    hash += key;
  }
  return prefix + hash + suffix;
};
