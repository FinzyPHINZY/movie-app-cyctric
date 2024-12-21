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

async function handleSignup(email, password, name, login) {
  try {
    console.log('attempting signup...');
    console.log(
      `${API_URL}/api/user/signup` === 'http://localhost:7000/api/user/signup'
    );
    console.log(`${API_URL}/api/user/signup`);
    const response = await axios.post(`${API_URL}/api/user/signup`, {
      email,
      password,
      name,
    });

    if (response.data.success) {
      await login(response.data);
      return response.data;
    } else {
      console.log('Sign up failed');
      return response;
    }
  } catch (error) {
    console.log('Error during Signup: ', error);
  }
}

async function fetchMovies(token) {
  try {
    const response = await axios.get(`${API_URL}/api/movies/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.log('Failed to fetch movie', error);
  }
}

async function createMovie(token, movie) {
  try {
    const response = await axios.post(`${API_URL}/api/movies/addMovie`, movie, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.log('Failed to create movie', error);
  }
}

async function getMovie(token, id) {
  try {
    const response = await axios.get(`${API_URL}/api/movies/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.log('Failed to fetch movie', error);
  }
}

async function updateMovie(token, movie) {
  console.log('API IS RUNNING');
  const { id } = movie;
  console.log('id for requrest', `api/movies/${id}`);
  console.log(movie);
  try {
    const response = await axios.put(`${API_URL}/api/movies/${id}`, movie, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('Failed to update movie', error);
  }
}

export {
  handleLogin,
  fetchMovies,
  createMovie,
  getMovie,
  updateMovie,
  handleSignup,
};
