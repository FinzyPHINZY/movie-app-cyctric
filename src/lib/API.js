import axios from 'axios';

import { API_URL } from '../../config';

async function handleLogin(email, password, login) {
  try {
    const response = await axios.post(`${API_URL}/api/user/login`, {
      email,
      password,
    });
    if (response.data.success) {
      await login(response.data);
      return response;
    } else {
      console.log('Login failed');
      return response;
    }
  } catch (error) {
    console.log('Error during login:', error);
  }
}

async function fetchMovies(token) {
  try {
    const response = await axios.get(`${API_URL}/api/movies/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('response from fetch movies', response);

    return response.data;
  } catch (error) {
    console.log('Failed to fetch movie', error);
  }
}

export { handleLogin, fetchMovies };
