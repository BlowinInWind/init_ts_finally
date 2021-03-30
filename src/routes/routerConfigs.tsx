import { RouteProps } from 'react-router-dom';
import BaseComponents from '@layout/index';
import asyncCom from './asyncCom';

const Index = asyncCom(import('@pages/Index'));
const Index2 = asyncCom(import('@pages/Index2'));
const Login = asyncCom(import('@pages/Login'));
const NotFound = asyncCom(import('@pages/404'));

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
        path: '/login',
        hideInMenu: true,
        component: Login
    },
    {
        path: '/404',
        hideInMenu: true,
        component: NotFound
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
                path: '/index/name',
                component: Index2
            },
            {
                path: '/index/bbb',
                component: Index
            }
        ]
    },
    {
        path: '/data',
        auth: true,
        component: BaseComponents,
        routes: [
            {
                path: '/data/home',
                component: Index
            },
            {
                path: '/data/name',
                component: Index2
            },
            {
                path: '/data/bbb',
                component: Index
            }
        ]
    },
    {
        path: '/',
        exact: true,
        redirect: '/index/home'
    },
    {
        path: '*',
        hideInMenu: true,
        component: NotFound
    }
];

const routeUsed = routers.map(item => createPermissionRouter(item, true));

export default routeUsed;
