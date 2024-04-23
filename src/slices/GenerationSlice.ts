import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypeGeneration } from '../types';

const generationSlice = createSlice({
  name: 'generation',
  initialState: [] as TypeGeneration[],
  reducers: {
    setGenerations: (_, action: PayloadAction<TypeGeneration[]>) => {
      return action.payload;
    },
  },
});

export const { setGenerations } = generationSlice.actions;

export default generationSlice.reducer;