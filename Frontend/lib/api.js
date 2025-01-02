import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/asupan'; // Ganti dengan URL backend Anda

export const inputAsupan = async (data) => {
  try {
    const response = await axios.post('http://localhost:8080/api/asupan', data); // Sesuaikan URL
    return response.data;
  } catch (error) {
    console.error('Error inputting asupan:', error);
    throw error;
  }
};


export const getRiwayatAsupan = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching riwayat asupan:', error.response || error.message);
    throw error;
  }
};
