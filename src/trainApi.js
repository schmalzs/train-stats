import fetch from 'node-fetch';

const URL = 'https://asm.transitdocs.com/api/trainDetail.php';

export const getTrain = (train, year, month, day) => {
  const queryParams = Object.entries({ train, year, month, day })
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return fetch(`${URL}?${queryParams}`).then(res => res.json());
};
