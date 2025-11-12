import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TRoles } from '@/types'
import { UserDTO } from '@/dto'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: undefined,
    isLoggedIn: false,
    role: '' as TRoles,
    userProfile: {} as UserDTO,
  },
  reducers: {
    updateUser: (state, action: PayloadAction<any>) => {
      state.id = action.payload.id
      state.userProfile = {
        ...state.userProfile,
        ...action.payload,
        isVerified: state.userProfile.isVerified,
      }
      state.isLoggedIn = true
      state.role = action.payload.role as TRoles
    },
  },
})

export const { updateUser } = userSlice.actions
