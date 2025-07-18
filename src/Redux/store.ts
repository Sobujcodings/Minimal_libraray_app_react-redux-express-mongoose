import {configureStore} from "@reduxjs/toolkit"
import { baseApi } from "./api/baseApi"


export const store = configureStore({
    reducer: {
        [baseApi.reducerPath] : baseApi.reducer,
    },
    middleware:(getDefautlMiddleware) => 
        getDefautlMiddleware().concat(baseApi.middleware),
})


export type RootState = ReturnType<typeof store.getState>;