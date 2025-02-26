import axios from 'axios';

const baseUrl = 'https://pixabay.com';
const endPoint = '/api';

export function getImg(searchName) {
  const params = new URLSearchParams({
    key: '48897316-c1284323f9ede48e892c0fd4f',
    q: searchName,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  const url = baseUrl + endPoint + `?${params}`;
  return axios.get(url);
}
