import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userType } from './userType';
import userService, {
  UpdatePasswordInputInterface,
  UpdateUserInputInterface,
  UserInputInterface,
  VerifyMfaInputInterface,
  VerifyPasswordInputInterface,
} from './userService';
import { UsersInterface } from '../../shared/models/User';

interface UserStoreInterface {
  user: UsersInterface | null;
  error: string;
  success: string;
  isLoading: boolean;
  message: string;
}

const initialState: UserStoreInterface = {
  user: null,
  error: '',
  success: '',
  isLoading: false,
  message: '',
};

// Register user
export const registerUser = createAsyncThunk(
  `user/${userType.REGISTER_USER}`,
  async (data: UserInputInterface, thunkAPI) => {
    try {
      return await userService.registerUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  `user/${userType.LOGIN_USER}`,
  async (data: UserInputInterface, thunkAPI) => {
    try {
      return await userService.loginUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Logout user
export const logout = createAsyncThunk(
  `user/${userType.LOGOUT_USER}`,
  async () => {
    userService.logout();
  }
);

// Get current user
export const getMe = createAsyncThunk(
  `user/${userType.GET_ME}`,
  async (_, thunkAPI) => {
    try {
      return await userService.getMe();
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Get QR Code
export const getQRCode = createAsyncThunk(
  `user/${userType.GET_QRCODE}`,
  async (_, thunkAPI) => {
    try {
      return await userService.getQRCode();
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Enable/Disable MFA
export const toggleMfa = createAsyncThunk(
  `user/${userType.TOGGLE_MFA}`,
  async (otp: string, thunkAPI) => {
    try {
      return await userService.toggleMfa(otp);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Verify MFA
export const verifyMfa = createAsyncThunk(
  `user/${userType.VERIFY_MFA}`,
  async (input: VerifyMfaInputInterface, thunkAPI) => {
    try {
      return await userService.verifyMfa(input);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Send verify email
export const sendVerifyEmail = createAsyncThunk(
  `user/${userType.SEND_VERIFY_EMAIL}`,
  async (_, thunkAPI) => {
    try {
      return await userService.sendVerifyEmail();
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Verify email
export const verifyEmail = createAsyncThunk(
  `user/${userType.VERIFY_EMAIL}`,
  async (otp: string, thunkAPI) => {
    try {
      return await userService.verifyEmail(otp);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update user
export const updateUser = createAsyncThunk(
  `user/${userType.UPDATE_USER}`,
  async (data: UpdateUserInputInterface, thunkAPI) => {
    try {
      return await userService.updateUser(data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update password
export const updatePassword = createAsyncThunk(
  `user/${userType.UPDATE_PASSWORD}`,
  async (data: UpdatePasswordInputInterface, thunkAPI) => {
    try {
      return await userService.updatePassword(data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update avatar
export const updateAvatar = createAsyncThunk(
  `user/${userType.UPDATE_AVATAR}`,
  async (base64Img: string | ArrayBuffer, thunkAPI) => {
    try {
      return await userService.updateAvatar(base64Img);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Request reset password
export const requestResetPassword = createAsyncThunk(
  `user/${userType.REQUEST_RESET_PASSWORD}`,
  async (email: string, thunkAPI) => {
    try {
      return await userService.requestResetPassword(email);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Verify reset password
export const verifyResetPassword = createAsyncThunk(
  `user/${userType.VERIFY_RESET_PASSWORD}`,
  async (input: VerifyPasswordInputInterface, thunkAPI) => {
    try {
      return await userService.verifyResetPassword(input);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.success = '';
      state.error = '';
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = userType.REGISTER_USER;
        state.error = '';
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = userType.REGISTER_USER;
        state.message = action.payload.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = userType.LOGIN_USER;
        state.error = '';
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = userType.LOGIN_USER;
        state.message = action.payload.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.success = userType.LOGOUT_USER;
        state.user = null;
      })
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = userType.GET_ME;
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = userType.GET_ME;
        state.message = action.payload.message;
      })
      .addCase(getQRCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQRCode.fulfilled, (state) => {
        state.isLoading = false;
        state.success = userType.GET_QRCODE;
      })
      .addCase(getQRCode.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = userType.GET_QRCODE;
        state.message = action.payload.message;
      })
      .addCase(toggleMfa.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(toggleMfa.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = userType.TOGGLE_MFA;
        state.user = action.payload;
      })
      .addCase(toggleMfa.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = userType.TOGGLE_MFA;
        state.message = action.payload.message;
      })
      .addCase(verifyMfa.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyMfa.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = userType.VERIFY_MFA;
        state.user = action.payload;
      })
      .addCase(verifyMfa.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = userType.VERIFY_MFA;
        state.message = action.payload.message;
      })
      .addCase(sendVerifyEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendVerifyEmail.fulfilled, (state) => {
        state.isLoading = false;
        state.success = userType.SEND_VERIFY_EMAIL;
      })
      .addCase(sendVerifyEmail.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = userType.SEND_VERIFY_EMAIL;
        state.message = action.payload.message;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = userType.VERIFY_EMAIL;
        state.user = action.payload;
      })
      .addCase(verifyEmail.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = userType.VERIFY_EMAIL;
        state.message = action.payload.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = userType.UPDATE_USER;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = userType.UPDATE_USER;
        state.message = action.payload.message;
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = userType.UPDATE_PASSWORD;
        state.user = action.payload;
      })
      .addCase(updatePassword.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = userType.UPDATE_PASSWORD;
        state.message = action.payload.message;
      })
      .addCase(updateAvatar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = userType.UPDATE_AVATAR;
        state.user = action.payload;
      })
      .addCase(updateAvatar.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = userType.UPDATE_AVATAR;
        state.message = action.payload.message;
      })
      .addCase(requestResetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(requestResetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.success = userType.REQUEST_RESET_PASSWORD;
      })
      .addCase(requestResetPassword.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = userType.REQUEST_RESET_PASSWORD;
        state.message = action.payload.message;
      })
      .addCase(verifyResetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyResetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.success = userType.VERIFY_RESET_PASSWORD;
      })
      .addCase(verifyResetPassword.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = userType.VERIFY_RESET_PASSWORD;
        state.message = action.payload.message;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
