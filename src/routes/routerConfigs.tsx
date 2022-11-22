import React from 'react';
import { RouteProps } from 'react-router-dom';
import BaseComponents from '@layout/index';
import asyncCom from './asyncCom';

const Index = asyncCom(React.lazy(() => import('@pages/Index/index')));
const Main = asyncCom(React.lazy(() => import('@pages/Main')));
const AntdDemo = asyncCom(React.lazy(() => import('@pages/AntdDemo')));
const Decorator = asyncCom(React.lazy(() => import('@pages/Decorator')));
const Login = asyncCom(React.lazy(() => import('@pages/Login')));
const NotFound = asyncCom(React.lazy(() => import('@pages/404')));

export type RouterConfig = RouteProps & {
    auth?: boolean; // 登录验证
    key?: string;
    name?: string; // 侧边栏名字
    path?: string; // 路径
    icon?: string; // icon
    routes?: Array<RouterConfig>; // 子路由数组
    redirect?: string; // 重定向地址
    hideInMenu?: boolean; // 在菜单中隐藏路由 可以用于详情页配置
};

/**
 * 根据数据重整路由 判断是第一个重定向还是404
 *
 * @param {RouterConfig} item
 * @param {boolean} [redirectOrNotFound=true] true代表重定向 如果父路由没有redirect，可以用这个办法默认指向第一个
 * @return {*}  {RouterConfig}
 */
const createPermissionRouter = (
    item: RouterConfig,
    redirectOrNotFound = true
): RouterConfig => {
    if (item.routes && item.routes.length > 0) {
        if (redirectOrNotFound) {
            return {
                ...item,
                redirect: item.routes?.[0]?.path,
                routes: item.routes.map(route =>
                    createPermissionRouter(route, redirectOrNotFound)
                )
            };
        }
        item.routes = [
            ...item.routes,
            {
                path: '*',
                hideInMenu: true,
                element: <NotFound></NotFound>
            }
        ];
        return item;
    }
    return {
        ...item
        // path: path + item.path,
        // exact: true
    };
};

const routers: RouterConfig[] = [
    {
        path: '/index',
        element: <BaseComponents></BaseComponents>,
        auth: true,
        routes: [
            {
                path: 'home',
                auth: true,
                element: <Index></Index>
            },
            {
                path: 'main/:id',
                auth: true,
                element: <Main></Main>
            },
            {
                path: 'antd',
                auth: true,
                element: <AntdDemo></AntdDemo>
            },
            {
                path: 'decorator',
                auth: true,
                element: <Decorator></Decorator>
            }
        ]
    },
    {
        path: '/index',
        redirect: '/index/home'
    },
    {
        path: '/',
        redirect: '/index/home'
    },
    {
        path: '/404',
        hideInMenu: true,
        element: <NotFound></NotFound>
    },
    {
        path: '/login',
        hideInMenu: true,
        element: <Login></Login>
    },
    {
        path: '*',
        hideInMenu: true,
        element: <NotFound></NotFound>
    }
];

const routeUsed = routers.map(item => createPermissionRouter(item, false));

export default routeUsed;
