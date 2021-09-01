import useUserStore from "../stores/UserStore";

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

const ONE_MB = 1024 * 1024;

export const ByteToMB = (val) => {
  const opts = {
    maximumFractionDigits: 0,
  };
  let result;
  try {
    result = new Intl.NumberFormat("en-us", opts).format(val / ONE_MB);
  } catch (ex) {
    result = Math.round(val / (ONE_MB));
  }
  return `${result} MB`;
};

const textDecoder = new TextDecoder("utf-8");

const getArrayBuffer = (size) => {
  const buffer = new ArrayBuffer(size);
  const view = new Uint8Array(buffer);
  const len = view.length;
  for (let i = 0; i < len; i++) {
    view[i] = Math.random() * (126 - 33) + 33;
  }
  return buffer;
};

export function getStr(size = ONE_MB) {
  const buffer = getArrayBuffer(size);
  return textDecoder.decode(buffer);
}
