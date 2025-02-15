import { axiosAuth } from './axiosInstance'; // Import Axios instance

// Login API call
export const loginApi = async (
  email: string,
  password: string
): Promise<any> => {
  const response = await axiosAuth.post('/auth/login/', {
    email,
    password,
  });
  return response.data;
};

// Signup API call
export const signupApi = async (
  email: string,
  password: string
): Promise<any> => {
  const response = await axiosAuth.post('/auth/signup/', {
    email,
    password,
  });
  return response.data;
};

// Refresh token API call
export const refreshTokenApi = async (refreshToken: string) => {
  const response = await axiosAuth.post(`/auth/token/refresh/`, {
    refresh: refreshToken,
  });
  return response;
};
