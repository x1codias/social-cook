import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth.reducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here if needed
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export default store;
