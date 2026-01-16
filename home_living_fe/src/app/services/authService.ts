import { UserRole } from '../model/UserRole';
import { User } from '../model/User';
import { StorageKeys } from '../enums/StorageKeys';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8085';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  code: number;
  message: string | null;
  data: {
    token: string;
    role: UserRole;
    username: string;
  };
}

export interface UserInfoResponse {
  code: number;
  message: string | null;
  data: User;
}

// Custom event để notify các component về auth changes
const AUTH_CHANGE_EVENT = 'authChange';

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*'
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: LoginResponse = await response.json();
      
      if (data.code === 200 && data.data) {
        // Lưu thông tin vào storage
        localStorage.setItem(StorageKeys.AUTH_TOKEN, data.data.token);
        localStorage.setItem(StorageKeys.AUTH_ROLE, data.data.role);
        localStorage.setItem(StorageKeys.AUTH_USERNAME, data.data.username);
        
        // Lấy thông tin user
        await this.fetchUserInfo(data.data.token, data.data.role);
        
        toast.success('Đăng nhập thành công!');
      } else {
        toast.error('Đăng nhập thất bại');
      }

      return data;
    } catch (error) {
      toast.error('Đăng nhập thất bại');
      throw error;
    }
  },

  async fetchUserInfo(token: string, role: UserRole): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/users/info`, {
        method: 'GET',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: UserInfoResponse = await response.json();

      if (data.code === 200 && data.data) {
        const user: User = {
          ...data.data,
          role,
          token
        };
        localStorage.setItem(StorageKeys.AUTH_USER, JSON.stringify(user));
        // Dispatch custom event để notify các component
        window.dispatchEvent(new CustomEvent(AUTH_CHANGE_EVENT, { detail: { user } }));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      return false;
    }
  },

  logout(): void {
    localStorage.removeItem(StorageKeys.AUTH_TOKEN);
    localStorage.removeItem(StorageKeys.AUTH_ROLE);
    localStorage.removeItem(StorageKeys.AUTH_USERNAME);
    localStorage.removeItem(StorageKeys.AUTH_USER);
    // Dispatch custom event để notify các component
    window.dispatchEvent(new CustomEvent(AUTH_CHANGE_EVENT, { detail: { user: null } }));
    toast.success('Đăng xuất thành công!');
  },

  getToken(): string | null {
    return localStorage.getItem(StorageKeys.AUTH_TOKEN);
  },

  getRole(): UserRole | null {
    const role = localStorage.getItem(StorageKeys.AUTH_ROLE);
    return role as UserRole | null;
  },

  getUsername(): string | null {
    return localStorage.getItem(StorageKeys.AUTH_USERNAME);
  },

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(StorageKeys.AUTH_USER);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Failed to parse user:', error);
        return null;
      }
    }
    return null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
};
