/** @format */

import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import rootReducer from './reducer';

const store = configureStore({
    reducer: rootReducer
});

const hotDev = (module: any) => {
    if (process.env.NODE_ENV === 'development' && module.hot) {
        module.hot.accept('./reducer', () => {
            // eslint-disable-next-line global-require
            const newRootReducer = require('./reducer').default;
            store.replaceReducer(newRootReducer);
        });
    }
};

hotDev(module);

// state 的type
export type RootState = ReturnType<typeof rootReducer>;

// dispatch 的type
export type AppDispatch = typeof store.dispatch;

// thunk 的type
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
