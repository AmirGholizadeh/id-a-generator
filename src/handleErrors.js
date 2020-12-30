const handleErrors = (config) => {
  // valid length
  if (!config.length) throw new Error("specify a length");
  if (config.length <= 0)
    throw new Error("length must not be equal or lower than 0");
  if (typeof config.length !== "number")
    throw new Error("type of property length is number");
  // valid prefix and suffix
  if (typeof config.prefix !== "string")
    throw new Error("type of property prefix is string");
  if (typeof config.suffix !== "string")
    throw new Error("type of property suffix is string");
  // valid keySets
  if (config.numbers !== undefined && typeof config.numbers !== "boolean")
    throw new Error("type of property numbers is boolean");
  if (config.uppercase !== undefined && typeof config.uppercase !== "boolean")
    throw new Error("type of property uppercase is boolean");
  if (config.lowercase !== undefined && typeof config.lowercase !== "boolean")
    throw new Error("type of property lowercase is boolean");
  // valid hashes
  if (config.hashes) {
    if (typeof config.hashes !== "string" && !Array.isArray(config.hashes))
      throw new Error(
        "type of property hashes must be string or an array of strings"
      );
    if (Array.isArray(config.hashes)) {
      if (!config.hashes.every((el) => typeof el === "string"))
        throw new Error("array hashes must include only string elements");
    }
  }
  // at least one specified keyset
  if (
    config.lowercase !== true &&
    config.uppercase !== true &&
    config.numbers !== true
  )
    throw new Error(
      "you should specify at least one key set to generate an ID"
    );
  // valid count
  if (config.count && typeof config.count !== "number")
    throw new Error("type of property count is number");
  if (config.count && config.count <= 0)
    throw new Error("count must not be equal or lower than 0");
};
module.exports = handleErrors;
