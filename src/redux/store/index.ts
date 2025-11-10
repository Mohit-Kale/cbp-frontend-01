import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { api } from "@/redux/services/api.config";
import { rtkQueryLogger } from "@/redux/services/api.util";
import { userSlice } from "../slices/user.slice";
import authReducer from "../slices/auth.slice";
// import { layoutSlice } from '../slice/layout.slice'
// import { userSlice } from '../slice/user.slice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [userSlice.name]: userSlice.reducer,
    auth: authReducer,
    // [layoutSlice.name]: layoutSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, rtkQueryLogger),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
