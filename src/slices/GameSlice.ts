import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',
  initialState: "" as string,
  reducers: {
    setGame: (_, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { setGame } = gameSlice.actions;

export default gameSlice.reducer;