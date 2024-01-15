import {configureStore} from '@reduxjs/toolkit';
import inventory from './module/inventory';
import vegetable from './module/vegetable';

export const store = configureStore({
  reducer: {
    inventory: inventory,
    vegetable: vegetable,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
