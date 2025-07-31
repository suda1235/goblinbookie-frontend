import axios from 'axios';

// Set your actual backend URL here or use Vite env variables
const API_BASE =
  import.meta.env.VITE_API_BASE_URL || 'https://goblinbookie-backend.onrender.com/api';

export async function fetchCardsByName(name: string) {
  const res = await axios.get(`${API_BASE}/cards`, { params: { name } });
  return res.data;
}

export async function fetchCardDetails(uuid: string) {
  const res = await axios.get(`${API_BASE}/cards/${uuid}`);
  return res.data;
}
