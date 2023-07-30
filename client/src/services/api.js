import axios from 'axios';

// Define the base URL of your backend API
const BASE_URL = 'https://your-backend-api-url.com/api';

// Create an instance of axios with the base URL
const api = axios.create({
  baseURL: BASE_URL,
});

// Set up request and response interceptors (if needed)
// Interceptors allow you to modify requests and responses before they are handled
// For example, you can add authentication tokens or error handling logic here

// Function to make a GET request to the API
export const get = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    // Handle error, e.g., show an error message or log the error
    throw error;
  }
};

// Function to make a POST request to the API
export const post = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    // Handle error, e.g., show an error message or log the error
    throw error;
  }
};

// Function to make a PUT request to the API
export const put = async (endpoint, data) => {
  try {
    const response = await api.put(endpoint, data);
    return response.data;
  } catch (error) {
    // Handle error, e.g., show an error message or log the error
    throw error;
  }
};

// Function to make a DELETE request to the API
export const remove = async (endpoint) => {
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    // Handle error, e.g., show an error message or log the error
    throw error;
  }
};
