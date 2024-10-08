import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import useAuth from '../stores/auth';

// Types
export interface TelegramDataDto {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  photo_url: string;
  auth_date: string;
  hash: string;
}

export interface AuthTokenSignedDto {
  access_token: string;
}

export interface ReturnedUser {
  id: number;
  username: string;
  picture?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface SignUpUserDto {
  email: string;
  password: string;
  username: string;
  picture?: string;
}

export interface CreateProductDto {
  name: string;
  description?: string;
  price: number;
  images: string[];
  categoryId: number;
  validUntil: string;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}

export interface ProductDto extends CreateProductDto {
  id: number;
}

// API response interface
interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

// API error interface
interface ApiError {
  message: string;
  status: number;
  statusText: string;
}

class ESNMarketApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://localhost:5000/v1',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    // Add request interceptor to set authorization header
    this.api.interceptors.request.use((config) => {
      const { token } = useAuth();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });
  }

  private handleResponse<T>(response: AxiosResponse<T>): ApiResponse<T> {
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  }

  private handleError(error: unknown | AxiosError): ApiError {
    if (!axios.isAxiosError(error)) {
      return {
        message: 'Unknown error',
        status: 500,
        statusText: 'Internal Server Error',
      };
    }

    return {
      message: error.response?.data?.message || error.message,
      status: error.response?.status || 500,
      statusText: error.response?.statusText || 'Internal Server Error',
    };
  }

  // Auth
  async loginWithTelegram(
    telegramData: TelegramDataDto,
  ): Promise<ApiResponse<AuthTokenSignedDto>> {
    try {
      const response = await this.api.post<AuthTokenSignedDto>(
        '/auth/telegram',
        telegramData,
      );
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async loginWithEmail(
    loginData: LoginUserDto,
  ): Promise<ApiResponse<AuthTokenSignedDto>> {
    try {
      const response = await this.api.post<AuthTokenSignedDto>(
        '/auth/login',
        loginData,
      );
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async signUp(
    signUpData: SignUpUserDto,
  ): Promise<ApiResponse<AuthTokenSignedDto>> {
    try {
      const response = await this.api.post<AuthTokenSignedDto>(
        '/auth/signup',
        signUpData,
      );
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getProfile(): Promise<ApiResponse<ReturnedUser>> {
    try {
      const response = await this.api.get<ReturnedUser>('/user/me');
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Products
  async createProduct(
    product: CreateProductDto,
  ): Promise<ApiResponse<ProductDto>> {
    try {
      const response = await this.api.post('/product', product);
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getAllProducts(): Promise<ApiResponse<ProductDto[]>> {
    try {
      const response = await this.api.get('/product');
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getProductById(id: number): Promise<ApiResponse<ProductDto>> {
    try {
      const response = await this.api.get(`/product/${id}`);
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateProduct(
    id: number,
    product: UpdateProductDto,
  ): Promise<ApiResponse<ProductDto>> {
    try {
      const response = await this.api.patch(`/product/${id}`, product);
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteProduct(id: number): Promise<ApiResponse<ProductDto>> {
    try {
      const response = await this.api.delete(`/product/${id}`);
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }
}

export default new ESNMarketApiService();
