import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    // isWebsiteLoading: true,
    sidebarDrawer: false,
  },
  reducers: {
    // handleWebsiteLoader: (state, action: PayloadAction<boolean>) => {
    //   state.isWebsiteLoading = action.payload
    // },
    setSidebarDrawer: (state, action: PayloadAction<boolean>) => {
      state.sidebarDrawer = action.payload
    },
  },
})

export const { setSidebarDrawer } = layoutSlice.actions
