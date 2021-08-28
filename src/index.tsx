/** @format */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { Router } from 'react-router-dom';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import '@common/assets/styles/index.scss';
// import eruda from 'eruda';
import history from './utils/history';
import Root from './routes';
import store from './store';

// eruda.init({
//     useShadowDom: true
// });

const App = () => {
    return (
        <ConfigProvider locale={zhCN}>
            <Provider store={store}>
                <Router history={history}>
                    <Root />
                </Router>
            </Provider>
        </ConfigProvider>
    );
};

const render = (Component: React.ReactElement) => {
    ReactDOM.render(Component, document.getElementById('app'));
};

console.log('12');

// 热更新
const hotDev = (module: any) => {
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept(() => {
            render(<App />);
        });
    }
};

hotDev(module);

render(<App />);
