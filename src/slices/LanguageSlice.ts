import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypeFullLanguage } from '../types';
import { fetchLanguage } from '../data/helper';

const get_saved_language = () => {
  const lang = localStorage.getItem('language');
  if (lang) return lang;
  return 'en';
}

const languageSlice = createSlice({
  name: 'language',
  initialState: get_saved_language() as string,
  reducers: {
    setLanguage: (_, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const getLanguage = (state: string): TypeFullLanguage => {
  return fetchLanguage(state);
};

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;