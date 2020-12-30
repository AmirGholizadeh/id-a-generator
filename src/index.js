// handlers
const handleErrors = require("./handlers/handleErrors");
const handleDuplicate = require("./handlers/handleDuplicate");
// generator
const generateAHash = require("./generators/generateAHash");
const generateMultipleHashes = require("./generators/generateMultipleHashes");
const generateKeyset = require("./generators/generateKeyset");
// utils

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
  config = Object.assign({}, config, { lowercase, prefix, suffix });
  // handle errors
  handleErrors(config);
  // generate keyset
  const keyset = generateKeyset({ lowercase, uppercase, numbers });
  // GENERATE
  let hash;
  if (count)
    hash = generateMultipleHashes({ length, count, keyset, suffix, prefix });
  else hash = generateAHash({ length, keyset, suffix, prefix });
  if (hashes) {
    const isDuplicated = handleDuplicate(hash, config);
    if (isDuplicated) return idGenerator(config);
  }
  return hash;
};
module.exports = idGenerator;
