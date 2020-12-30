module.exports = ({ lowercase, uppercase, numbers }) => {
  // keysets
  const lowercaseKeyset = [
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
  const uppercaseKeyset = lowercaseKeyset.map((el) => el.toUpperCase());
  const numberKeyset = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  // generate an array of keysets based on options
  return []
    .concat(lowercase ? [lowercaseKeyset] : [])
    .concat(uppercase ? [uppercaseKeyset] : [])
    .concat(numbers ? [numberKeyset] : []);
};
