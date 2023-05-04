export const getMaxAge = (time: string) => {
  let result = 0;

  if (time.includes('d')) {
    time = time.slice(0, time.indexOf('d'));
    result = Number(time) * 24 * 3600;
  }

  if (time.includes('m')) {
    time = time.slice(0, time.indexOf('m'));
    result = Number(time) * 24 * 3600;
  }

  return result;
};
