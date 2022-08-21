import {configureStore} from '@reduxjs/toolkit';
import search from '../search-panel/search-slice';
import { reducer, middleware, reducerPath } from '../api/api-employees-slice';
import { reducer as filterReducer, 
         middleware as filterMiddleware,
         reducerPath as filterReducerPath} from '../api/api-filters-slice';

export const store = configureStore({
    reducer: {
        [reducerPath]: reducer,
        [filterReducerPath]: filterReducer,
        search
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
                                            .concat(middleware, filterMiddleware),
    devTools: process.env.NODE_ENV !== 'production'
});