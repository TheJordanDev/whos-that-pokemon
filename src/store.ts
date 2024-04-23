import { configureStore } from '@reduxjs/toolkit';
import generationReducer from './slices/GenerationSlice';
import languageReducer from './slices/LanguageSlice';
import themeReducer from './slices/ThemeSlice';
import gameReducer from './slices/GameSlice';

export const store = configureStore({
  reducer: {
    generations: generationReducer,
    language: languageReducer,
    theme: themeReducer,
    game: gameReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;