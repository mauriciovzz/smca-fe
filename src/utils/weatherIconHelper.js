import { Moon } from 'lunarphase-js';

const getPrecipitationIcon = (value, hour, selectedDate) => {
  if (value === null)
    return 'wi wi-na text-gray-400';

  // daytime
  if (hour > 6 && hour < 19) {
    if (value)
      return 'wi wi-day-showers text-orange-700';
    return 'wi wi-day-sunny text-yellow-400';
  }

  // nightime
  const phase = Moon.lunarPhase(selectedDate);

  if (value) {
    if (phase === 'New' || phase === 'Full')
      return 'wi wi-night-showers text-sky-700';
    return 'wi wi-night-alt-showers text-sky-700';
  }

  switch (phase) {
    case 'New':
      return 'wi wi-moon-alt-new text-gray-400';
    case 'Waxing Crescent':
      return 'wi wi-moon-alt-waxing-crescent-4 text-gray-400';
    case 'First Quarter':
      return 'wi wi-moon-alt-first-quarter text-gray-400';
    case 'Waxing Gibbous':
      return 'wi wi-moon-alt-waxing-gibbous-2 text-gray-400';
    case 'Full':
      return 'wi wi-moon-alt-full text-gray-400';
    case 'Waning Gibbous':
      return 'wi wi-moon-alt-waning-gibbous-4 text-gray-400';
    case 'Last Quarter':
      return 'wi wi-moon-alt-third-quarter text-gray-400';
    case 'Waning Crescent':
      return 'wi wi-moon-alt-waning-crescent-4 text-gray-400';
    default:
      return 'wi wi-night-clear text-yellow-400';
  }
};

const getReadingIcon = (hour, data, selectedDate, rainReadings) => {
  if (hour === 'sunrise')
    return 'wi wi-sunrise text-yellow-400';
  if (hour === 'sunset')
    return 'wi wi-sunset text-orange-400';
  if (data === null)
    return 'wi wi-na text-gray-400';

  const hasRainSensor = rainReadings !== null;
  const rainReading = hasRainSensor ? rainReadings.find((r) => r.hour === hour).value : null;

  if (hour > 6 && hour < 19) {
    if (hasRainSensor) {
      if (rainReading === 1)
        return 'wi wi-day-showers text-orange-700';
    }
    return 'wi wi-day-sunny text-yellow-400';
  }

  const phase = Moon.lunarPhase(selectedDate);
  if (hasRainSensor) {
    if (rainReading === 1) {
      if (phase === 'New' || phase === 'Full')
        return 'wi wi-night-showers text-sky-700';
      return 'wi wi-night-alt-showers text-sky-700';
    }
  }

  switch (phase) {
    case 'New':
      return 'wi wi-moon-alt-new text-gray-400';
    case 'Waxing Crescent':
      return 'wi wi-moon-alt-waxing-crescent-4 text-gray-400';
    case 'First Quarter':
      return 'wi wi-moon-alt-first-quarter text-gray-400';
    case 'Waxing Gibbous':
      return 'wi wi-moon-alt-waxing-gibbous-2 text-gray-400';
    case 'Full':
      return 'wi wi-moon-alt-full text-gray-400';
    case 'Waning Gibbous':
      return 'wi wi-moon-alt-waning-gibbous-4 text-gray-400';
    case 'Last Quarter':
      return 'wi wi-moon-alt-third-quarter text-gray-400';
    case 'Waning Crescent':
      return 'wi wi-moon-alt-waning-crescent-4 text-gray-400';
    default:
      return 'wi wi-night-clear text-yellow-400';
  }
};

export default {
  getPrecipitationIcon,
  getReadingIcon,
};
