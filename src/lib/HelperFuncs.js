export const ONE_MB = 1024 * 1024;

export function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function guid() {
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
}

export const generateUID = () => {
  const id = guid();
  return id;
};

export const isEmpty = (obj) =>
  obj === null || obj === undefined || Object.keys(obj).length === 0;

export function ByteToMB(bytes) {
  let thresh = 1024;
  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }
  const units = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let u = -1;
  do {
    bytes /= thresh;
    ++u;
  } while (Math.abs(bytes) >= thresh && u < units.length - 1);
  return bytes.toFixed(1) + " " + units[u];
}

export function getStr(size = ONE_MB) {
  let chars = "abcdefghijklmnopqrstuvwxyz".split("");
  let len = chars.length;
  let random_data = [];

  while (size--) {
    random_data.push(chars[(Math.random() * len) | 0]);
  }

  return random_data.join("");
}

export function shallowEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
}
