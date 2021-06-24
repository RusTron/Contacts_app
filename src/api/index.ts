const DATA_URL = 'https://randomuser.me/api/?results=';

const number = Math.ceil(Math.random() * 1000);

export const getData = (): Promise<void> => {
  return fetch(`${DATA_URL}${number}`)
    .then((response) => response.json())
    .catch((e) => ({ error: e }));
};
