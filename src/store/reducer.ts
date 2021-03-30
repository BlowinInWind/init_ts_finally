/** @format */

// /** @format */
// import path from 'path';
// import { combineReducers } from 'redux';

// const files = require.context('@reducers', false, /\.js$/);

// const modules = {};

// files.keys().forEach(key => {
//     const name = path.basename(key, '.js');
//     const file = files(key);
//     modules[name] = (file.__esModule && file.default) || files(key);
// });

// export default combineReducers(modules);
import { combineReducers } from '@reduxjs/toolkit';
import counter from './counter';
import counter1 from './counter1';

const reducer = combineReducers({
    counter,
    counter1
});

export default reducer;
