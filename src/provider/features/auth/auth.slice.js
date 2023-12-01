import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUser } from '@/common/utils/users.util';
import authService from './auth.service';

// Get user from localStorage
const user = getUser();
const initialState = {
  sidebarToggleItem: false,
  logoutLoader: false,
  login: {
    data: user || null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
  },
  signUp: {
    data: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
  },
  logout: {
    data: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
  },
  loginAndSignUpWithOAuth: {
    data: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
  },
  loginAndSignUpWithLinkedin: {
    data: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
  }
};

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async ({ payload, successCallBack, callBackMessage }, thunkAPI) => {
    try {
      const response = await authService.login(payload);
      if (response.Succeeded) {
        successCallBack(response.data);
        return response.data;
      }
      return thunkAPI.rejectWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue({ payload: error });
    }
  }
);
// signUp user
export const signUp = createAsyncThunk(
  'auth/register',
  async ({ payload, successCallBack, callBackMessage }, thunkAPI) => {
    try {
      const response = await authService.signUp(payload);
      if (response.Succeeded) {
        successCallBack(response.data);
        return response.data;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue({ payload: error });
    }
  }
);

export const loginAndSignUpWithOAuth = createAsyncThunk(
  'auth/loginAndSignUpWithOAuth',
  async ({ loginType, email, accessToken, successCallBack }, thunkAPI) => {
    try {
      const response = await authService.loginAndSignUpWithOAuth({
        loginType,
        email,
        accessToken
      });

      if (response.Succeeded) {
        successCallBack(response.data);
        return response.data;
      }
      return thunkAPI.rejectWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue({ payload: error });
    }
  }
);

export const loginAndSignUpWithLinkedin = createAsyncThunk(
  'auth/loginAndSignUpWithLinkedin',
  async ({ payload, successCallBack }, thunkAPI) => {
    try {
      const response = await authService.loginAndSignUpWithLinkedin(payload);
      if (response.Succeeded) {
        successCallBack(response.data);
        return response.data;
      }
      return thunkAPI.rejectWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue({ payload: error });
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (payload, thunkAPI) => {
  try {
    const response = await authService.logout();
    localStorage.removeItem('user');
    localStorage.removeItem('isOtpVerify');
    localStorage.removeItem('userId');
    localStorage.removeItem('phone');
    localStorage.removeItem('userProfile');
    if (response.Succeeded) {
      return response;
    }
    return thunkAPI.rejectWithValue(response);
  } catch (error) {
    localStorage.removeItem('user');
    return thunkAPI.rejectWithValue({ payload: error });
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSidebarToggleItem: (state, action) => {
      state.sidebarToggleItem = action.payload;
    },
    setLogoutLoader: (state, action) => {
      state.logoutLoader = action.payload;
    },
    reset: (state) => {
      state.login = {
        data: user || null,
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: ''
      };
      state.logout = {
        data: null,
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: ''
      };
      state.register = {
        data: null,
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: ''
      };
      state.loginAndSignUpWithOAuth = {
        data: null,
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: ''
      };
      state.loginAndSignUpWithLinkedin = {
        data: null,
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: ''
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.login.isLoading = true;
        state.login.message = '';
        state.login.isError = false;
        state.login.isSuccess = false;
        state.login.data = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.login.isLoading = false;
        state.login.isSuccess = true;
        state.login.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.login.message = action.payload.message;
        state.login.isLoading = false;
        state.login.isError = true;
        state.login.data = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.signUp.isLoading = false;
        state.signUp.isSuccess = true;
        state.signUp.data = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.signUp.message = action.payload.message;
        state.signUp.isLoading = false;
        state.signUp.isError = true;
        state.signUp.data = null;
      })
      .addCase(signUp.pending, (state) => {
        state.signUp.isLoading = true;
        state.signUp.message = '';
        state.signUp.isError = false;
        state.signUp.isSuccess = false;
        state.signUp.data = null;
      })
      .addCase(logout.pending, (state) => {
        state.logout.isLoading = true;
        state.logout.message = '';
        state.logout.isError = false;
        state.logout.isSuccess = false;
        state.logout.data = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.logout.isLoading = false;
        state.logout.isSuccess = true;
        state.logout.data = action.payload;
      })
      .addCase(logout.rejected, (state, action) => {
        state.logout.message = action.payload.message;
        state.logout.isLoading = false;
        state.logout.isError = true;
        state.logout.data = null;
      })
      .addCase(loginAndSignUpWithOAuth.pending, (state) => {
        state.loginAndSignUpWithOAuth.isLoading = true;
        state.loginAndSignUpWithOAuth.message = '';
        state.loginAndSignUpWithOAuth.isError = false;
        state.loginAndSignUpWithOAuth.isSuccess = false;
        state.loginAndSignUpWithOAuth.data = null;
      })
      .addCase(loginAndSignUpWithOAuth.fulfilled, (state, action) => {
        state.loginAndSignUpWithOAuth.isLoading = false;
        state.loginAndSignUpWithOAuth.isSuccess = true;
        state.loginAndSignUpWithOAuth.data = action.payload;
      })
      .addCase(loginAndSignUpWithOAuth.rejected, (state, action) => {
        state.loginAndSignUpWithOAuth.message = action.payload.message;
        state.loginAndSignUpWithOAuth.isLoading = false;
        state.loginAndSignUpWithOAuth.isError = true;
        state.loginAndSignUpWithOAuth.data = null;
      })
      .addCase(loginAndSignUpWithLinkedin.pending, (state) => {
        state.loginAndSignUpWithLinkedin.isLoading = true;
        state.loginAndSignUpWithLinkedin.message = '';
        state.loginAndSignUpWithLinkedin.isError = false;
        state.loginAndSignUpWithLinkedin.isSuccess = false;
        state.loginAndSignUpWithLinkedin.data = null;
      })
      .addCase(loginAndSignUpWithLinkedin.fulfilled, (state, action) => {
        state.loginAndSignUpWithLinkedin.isLoading = false;
        state.loginAndSignUpWithLinkedin.isSuccess = true;
        state.loginAndSignUpWithLinkedin.data = action.payload;
      })
      .addCase(loginAndSignUpWithLinkedin.rejected, (state, action) => {
        state.loginAndSignUpWithLinkedin.message = action.payload.message;
        state.loginAndSignUpWithLinkedin.isLoading = false;
        state.loginAndSignUpWithLinkedin.isError = true;
        state.loginAndSignUpWithLinkedin.data = null;
      });
  }
});

export const { reset, setSidebarToggleItem, setLogoutLoader } = authSlice.actions;

export default authSlice.reducer;
