import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    mode: 'dark',
    themeSetup: 'culturesummit',
  },
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
    },
    setThemeSetup: (state, action: PayloadAction<string>) => {
      state.themeSetup = action.payload
    },
  },
})

export const { toggleTheme, setThemeSetup } = layoutSlice.actions
