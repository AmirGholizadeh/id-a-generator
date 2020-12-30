module.exports = (hash, config) => {
  let isDuplicated = false;
  const { hashes } = config;
  if (typeof hashes === "string") {
    if (typeof hash === "string" && hash === hashes) isDuplicated = true;
    else if (Array.isArray(hash) && hash.some((el) => el === hashes))
      isDuplicated = true;
  } else {
    if (typeof hash === "string" && hashes.includes(hash)) isDuplicated = true;
    else if (
      Array.isArray(hash) &&
      hash.some((el) => hashes.some((el2) => el === el2))
    )
      isDuplicated = true;
  }
  return isDuplicated;
};
