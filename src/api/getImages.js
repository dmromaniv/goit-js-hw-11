import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32382807-167a2d79aeddf1c8c56a7ed15';

// Axios instance config
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  },
});

// Get images from pixabay
export async function getImages(searchFilter, currentPage = 1) {
  try {
    const { data } = await axiosInstance.get('', {
      params: { q: searchFilter, page: currentPage },
    });

    return data;
  } catch (error) {
    console.log('Failed request');
  }
}
