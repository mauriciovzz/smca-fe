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

const getAqiColor = (aqi) => {
  switch (true) {
    case (aqi >= 0 && aqi <= 50):
      return {
        bgColor: 'bg-aqi1/75',
        borderColor: 'border-aqi1',
      };
    case (aqi <= 100):
      return {
        bgColor: 'bg-aqi2/75',
        borderColor: 'border-aqi2',
      };
    case (aqi <= 150):
      return {
        bgColor: 'bg-aqi3/75',
        borderColor: 'border-aqi3',
      };
    case (aqi <= 200):
      return {
        bgColor: 'bg-aqi4/75',
        borderColor: 'border-aqi4',
      };
    case (aqi <= 300):
      return {
        bgColor: 'bg-aqi5/75',
        borderColor: 'border-aqi5',
      };
    case (aqi <= 500):
      return {
        bgColor: 'bg-aqi6/75',
        borderColor: 'border-aqi6',
      };
    default:
      return {
        bgColor: 'bg-slate-100',
        borderColor: 'border-slate-100',
      };
  }
};

const getUvIndexColor = (value) => {
  if (value === null)
    return {
      color: 'black',
      reading: '-',
    };

  const index = Math.round(value / 0.1);

  switch (true) {
    case (index < 3):
      return {
        bgColor: 'bg-uvi1/75',
        borderColor: 'border-uvi1',
        index,
      };
    case (index < 6):
      return {
        bgColor: 'bg-uvi2/75',
        borderColor: 'border-uvi2',
        index,
      };
    case (index < 8):
      return {
        bgColor: 'bg-uvi3/75',
        borderColor: 'border-uvi3',
        index,
      };
    case (index < 11):
      return {
        bgColor: 'bg-uvi4/75',
        borderColor: 'border-uvi4',
        index,
      };
    default:
      return {
        bgColor: 'bg-uvi5/75',
        borderColor: 'border-uvi5',
        index: '+11',
      };
  }
};

export default {
  getDarkerColor,
  getAqiColor,
  getUvIndexColor,
};
