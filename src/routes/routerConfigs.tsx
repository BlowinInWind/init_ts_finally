import React from 'react';
import { RouteProps } from 'react-router-dom';
import BaseComponents from '@layout/index';
import asyncCom from './asyncCom';

const Index = asyncCom(React.lazy(() => import('@pages/Index/index')));
const Main = asyncCom(React.lazy(() => import('@pages/Main')));
const Error = asyncCom(React.lazy(() => import('@pages/Error')));
const Login = asyncCom(React.lazy(() => import('@pages/Login')));
const Mode = asyncCom(React.lazy(() => import('@pages/Mode')));
const Hooks = asyncCom(React.lazy(() => import('@pages/Hooks')));
const NotFound = asyncCom(React.lazy(() => import('@pages/404')));

export interface RouterConfig extends RouteProps {
    auth?: boolean; // 登录验证
    key?: string;
    name?: string; // 侧边栏名字
    path?: string; // 路径
    icon?: string; // icon
    routes?: Array<RouterConfig>; // 子路由数组
    redirect?: string; // 重定向地址
    hideInMenu?: boolean; // 在菜单中隐藏路由 可以用于详情页配置
}

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
                component: NotFound
            }
        ];
        return item;
    }
    return {
        ...item,
        // path: path + item.path,
        exact: true
    };
};

const routers: RouterConfig[] = [
    {
        path: '/404',
        hideInMenu: true,
        component: NotFound
    },
    {
        path: '/login',
        hideInMenu: true,
        component: Login
    },
    {
        path: '/index',
        component: BaseComponents,
        auth: true,
        routes: [
            {
                path: '/index/home',
                component: Index
            },
            {
                path: '/index/error',
                component: Error
            },
            {
                path: '/index/hooks',
                component: Hooks
            },
            {
                path: '/index/mode',
                component: Mode
            },
            {
                path: '/index/main/:id',
                component: Main
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
        path: '*',
        hideInMenu: true,
        component: NotFound
    }
];

const routeUsed = routers.map(item => createPermissionRouter(item, false));

export default routeUsed;
