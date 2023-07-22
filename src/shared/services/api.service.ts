import axios from 'axios';
import authStorageService from './authStorage.service';

export class ApiService {
  axiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:5001/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.axiosInstance.interceptors.request.use(function (config) {
      const token = authStorageService().getToken();
      config.headers!.Authorization = token ? `Bearer ${token}` : '';
      return config;
    });
  }

  async get(resource: string, params: any = {}) {
    try {
      const response = await this.axiosInstance.get(resource, { params });
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async post(resource: string, data: any, params: any = {}) {
    try {
      const response = await this.axiosInstance.post(resource, data, {
        params,
      });
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async put(resource: string, data: any, params: any = {}) {
    try {
      const response = await this.axiosInstance.put(resource, data, {
        params,
      });
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
}
