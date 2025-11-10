import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export type TAuthMode = 'signin' | 'signup'
export type TRoles = 'USER' | 'CONSULTANT'

interface AuthState {
  isLoggedIn: boolean
  token: string | null
  authDialog: {
    authDialogOpen: boolean
    authMode: TAuthMode
    authRole: TRoles
  }
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  authDialog: {
    authDialogOpen: false,
    authMode: 'signin',
    authRole: 'USER',
  },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleLogin: (state, action: PayloadAction<{ token: string }>) => {
      state.isLoggedIn = true
      state.token = action.payload.token
    },
    handleLogout: (state) => {
      state.isLoggedIn = false
      state.token = null
    },
    handleAuthDialog: (state, action: PayloadAction<{ authDialogOpen: boolean; authMode: TAuthMode; authRole: TRoles }>) => {
      state.authDialog.authDialogOpen = action.payload.authDialogOpen
      state.authDialog.authMode = action.payload.authMode
      state.authDialog.authRole = action.payload.authRole
    },
  },
})

export const { handleLogin, handleLogout, handleAuthDialog } = authSlice.actions
export default authSlice.reducer
