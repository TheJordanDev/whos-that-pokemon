import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: "light" as string,
  reducers: {
    setTheme: (_, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;