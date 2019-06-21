async function getData(url) {
  try {
    const request = await fetch(url);
    const result = await request.json();
    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(err);
  }
}