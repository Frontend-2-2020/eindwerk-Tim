import moment from "moment";

export const rgbToHex = (rgb) => {
  let hex = Number(rgb).toString(16);
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
};

export const ellipsify = (str) => {
  if (str.length > 100) {
    return str.substring(0, 100) + "...";
  } else {
    return str;
  }
};

export const timeDiff = (timestamp) => {
  const worker = moment.duration(timestamp);
  if (worker._data.days > 0) {
    return worker._data.days + " days";
  }
};
