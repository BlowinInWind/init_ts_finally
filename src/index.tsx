/** @format */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import '@common/assets/styles/index.scss';
import Root from './routes';
import store from './store';

const App = () => {
    return (
        <ConfigProvider locale={zhCN}>
            <Provider store={store}>
                <Router>
                    <Root />
                </Router>
            </Provider>
        </ConfigProvider>
    );
};

const render = (Component: React.ReactElement) => {
    ReactDOM.render(Component, document.getElementById('app'));
};

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
