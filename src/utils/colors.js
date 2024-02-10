const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
};

const componentToHex = (c) => {
  const hex = c.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
};

const rgbToHex = (r, g, b) => `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;

const getDarkerColor = (hex, percentage) => {
  const actualPercentage = 1 - percentage;

  const rgb = hexToRgb(hex);

  const darkerR = Math.round(rgb.r * actualPercentage);
  const darkerG = Math.round(rgb.g * actualPercentage);
  const darkerB = Math.round(rgb.b * actualPercentage);

  return rgbToHex(darkerR, darkerG, darkerB);
};

export default {
  getDarkerColor,
};
