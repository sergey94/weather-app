export const lsSet = (key, data) => {
  if(data) {
    const stringified = JSON.stringify(data);
    localStorage.setItem(key, stringified);
  }
}

export const lsGet = (key) => {
  const data = localStorage.getItem(key);
  if(data) {
    try {
      const parsed = JSON.parse(data);
      return parsed;
    } catch {
      return null;
    }
  }
  return null;
}

export const getRequest = async (url, queryParams) => {
  const queryParamsString = queryParams
    ? '?' + Object.keys(queryParams).map(key => `${key}=${queryParams[key]}`).join('&')
    : '';
  
  const response = await fetch(`${url}${queryParamsString}`);
  if(response.ok) {
    const data = await response.json();
    return data;
  }
  throw new Error(response.statusText);
}

export const getLocation = () => {
  if(navigator?.geolocation?.getCurrentPosition) {
    return new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(
        ({coords}) => resolve(coords),
        () => reject(),
      ),
    );
  }
  return Promise.reject();
}