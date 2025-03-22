import { configureStore } from "@reduxjs/toolkit";

// services
import { AuthApi } from "./services/Auth";
import { UserApi } from "./services/User";
import userData from './slice/User';


export const store = configureStore({
    reducer: {
        userData,
        [AuthApi.reducerPath]: AuthApi.reducer,
        [UserApi.reducerPath]: UserApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
        AuthApi.middleware,
        UserApi.middleware
    ])
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch