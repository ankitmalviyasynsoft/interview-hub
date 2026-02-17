import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, extendedApi } from '../services/auth.api'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(extendedApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.user = payload?.user
      state.token = payload?.token
      state.isAuthenticated = true
    })
  },
})

export const { setCredentials, logout } = authSlice.actions

export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user
export const selectCurrentToken = (state: { auth: AuthState }) => state.auth.token
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated

export default authSlice.reducer
