export const ONE_MB = 1000 * 1000;

let guid = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};

export const generateUID = () => {
  return guid();
};

export const isEmpty = (obj) =>
  obj === null || obj === undefined || Object.keys(obj).length === 0;

export const ByteToMB = (val) => {
  const opts = {
    maximumFractionDigits: 1,
  };
  let result;
  try {
    result = new Intl.NumberFormat("en-us", opts).format(val / ONE_MB);
  } catch (ex) {
    result = Math.round(val / ONE_MB);
  }
  return `${result} MB`;
};

export function getStr(size = ONE_MB) {
  let chars = "abcdefghijklmnopqrstuvwxyz".split("");
  let len = chars.length;
  let random_data = [];

  while (size--) {
    random_data.push(chars[(Math.random() * len) | 0]);
  }

  return random_data.join("");
}
