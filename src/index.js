const handleErrors = require("./handleErrors");
const generateKeyset = require("./generateKeyset");
const generateMultipleHashes = require("./generateMultipleHashes");
const generateAHash = require("./genereateAHash");
const handleDuplicate = require("./handleDuplicate");

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
