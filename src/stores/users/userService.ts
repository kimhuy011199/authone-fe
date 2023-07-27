import { ApiService } from '../../shared/services/api.service';
import authStorageService from '../../shared/services/authStorage.service';

const endpoint = 'auth';
const apiService = new ApiService();

export interface UserInputInterface {
  email: string;
  password: string;
}

export interface VerifyMfaInputInterface {
  otp: string;
  mfaToken: string;
}

export interface UpdatePasswordInputInterface {
  password: string;
  oldPassword: string;
}

export interface UpdateUserInputInterface {
  name: string;
}

export interface VerifyPasswordInputInterface {
  passwordToken: string;
  password: string;
}

// Register user
const registerUser = async (input: UserInputInterface) => {
  const data = await apiService.post(`${endpoint}/register`, input);
  const { accessToken } = data;
  authStorageService().setToken(accessToken);
  return data.user;
};

// Login user
const loginUser = async (input: UserInputInterface) => {
  const data = await apiService.post(`${endpoint}/login`, input);
  const { accessToken } = data;
  authStorageService().setToken(accessToken);
  return data;
};

// Logout user
const logout = () => {
  authStorageService().removeToken();
};

// Get user me
const getMe = async () => {
  const data = await apiService.get(`${endpoint}/me`);
  return data.user;
};

// Get QR Code
const getQRCode = async () => {
  const data = await apiService.get(`${endpoint}/qrcode`);
  return data.qrCodeImgUrl;
};

// Enable/Disable MFA
const toggleMfa = async (otp: string) => {
  const data = await apiService.put(`${endpoint}/toggle-mfa`, { otp });
  return data.user;
};

// Verify MFA
const verifyMfa = async (input: VerifyMfaInputInterface) => {
  const data = await apiService.post(`${endpoint}/verify-mfa`, input);
  const { accessToken } = data;
  authStorageService().setToken(accessToken);
  return data.user;
};

// Send verify email
const sendVerifyEmail = async () => {
  const data = await apiService.post(`${endpoint}/send-verify-email`, {});
  return data;
};

// Verify email
const verifyEmail = async (otp: string) => {
  const data = await apiService.post(`${endpoint}/verify-email`, { otp });
  return data.user;
};

// Update user
const updateUser = async (input: UpdateUserInputInterface) => {
  const data = await apiService.put(`${endpoint}/update-user`, input);
  return data.user;
};

// Update password
const updatePassword = async (input: UpdatePasswordInputInterface) => {
  const data = await apiService.put(`${endpoint}/update-password`, input);
  return data.user;
};

// Update avatar
const updateAvatar = async (base64Img: string | ArrayBuffer) => {
  const data = await apiService.put(`${endpoint}/update-avatar`, { base64Img });
  return data.user;
};

// Request reset password
const requestResetPassword = async (email: string) => {
  const data = await apiService.post(`${endpoint}/request-reset-password`, {
    email,
  });
  return data.user;
};

// Verify reset password
const verifyResetPassword = async (input: VerifyPasswordInputInterface) => {
  const data = await apiService.post(
    `${endpoint}/verify-reset-password`,
    input
  );
  return data.user;
};

const userService = {
  registerUser,
  loginUser,
  logout,
  getMe,
  getQRCode,
  toggleMfa,
  verifyMfa,
  sendVerifyEmail,
  verifyEmail,
  updateUser,
  updatePassword,
  updateAvatar,
  requestResetPassword,
  verifyResetPassword,
};

export default userService;
