import axios from 'axios';

export const subscribeToNewsLetter = async (email: string) => {
  const response = await axios.get(`/api/email?email=${email}`, {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return response?.data;
};
