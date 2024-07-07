export const fetcher = async (url: string) => {
  return await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
    method: 'GET',
  })
    .then(res => res.json())
    .catch(err => {
      throw new Error(err);
    });
};
