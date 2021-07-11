const padLeft = (x: number) => {
  if (x >= 10) return x;
  return `0${x}`;
};
// eslint-disable-next-line import/prefer-default-export
export const getTimeAsStr = (seconds: number) => {
  let rem = seconds;
  const hours = Math.floor(seconds / 3600);

  rem -= hours * 3600;
  const minutes = Math.floor(rem / 60);
  const minutesStr = hours > 0 ? padLeft(minutes) : minutes;
  rem -= minutes * 60;
  rem = Math.floor(rem);
  const secondsStr = padLeft(rem);

  return `${hours >= 1 ? `${hours}:` : ''}${minutesStr}:${secondsStr}`;
};
