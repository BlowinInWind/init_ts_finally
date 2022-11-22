// /** @format */

// import React from 'react';
// import { Switch, Route, Redirect } from 'react-router-dom';
// import routers, { RouterConfig } from './routerConfigs';

// const renderRoutes = (routes: RouterConfig[]) => {
//     return (
//         routes && (
//             <Switch>
//                 {routes.map((route: RouterConfig, i) => {
//                     return (
//                         <Route
//                             key={route.key || i}
//                             exact={route.exact}
//                             path={route.path}
//                             render={props => {
//                                 if (route.auth) {
//                                     if (!localStorage.getItem('name')) {
//                                         return (
//                                             <Redirect to="/login"></Redirect>
//                                         );
//                                     }
//                                 }
//                                 return route.routes &&
//                                     route.routes.length > 0 ? (
//                                     <route.component {...props}>
//                                         <Switch>
//                                             {renderRoutes(route.routes)}
//                                         </Switch>
//                                         {route.redirect && (
//                                             <Redirect
//                                                 to={route.redirect}
//                                             ></Redirect>
//                                         )}
//                                     </route.component>
//                                 ) : (
//                                     <>
//                                         {route.redirect ? (
//                                             <Redirect
//                                                 to={route.redirect}
//                                             ></Redirect>
//                                         ) : (
//                                             <route.component
//                                                 {...props}
//                                             ></route.component>
//                                         )}
//                                     </>
//                                 );
//                             }}
//                             strict={route.strict}
//                         ></Route>
//                     );
//                 })}
//             </Switch>
//         )
//     );
// };

// export default () => renderRoutes(routers);
/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-no-undef */
/*
 * @Author: 姜通
 * @Date: 2021-03-30 16:31:48
 * @LastEditTime: 2021-11-06 15:26:07
 * @Description:
 * @FilePath: /init_ts_finally/src/routes/index.tsx
 */

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import routers, { RouterConfig } from './routerConfigs';

const renderRoutes = (routes: RouterConfig[]) => {
    return routes.map((route: RouterConfig) => {
        if (route.auth) {
            if (!localStorage.getItem('name')) {
                return (
                    <Route
                        children={({ match }) =>
                            match ? (
                                <Navigate to="/login"></Navigate>
                            ) : (
                                <Navigate to="/login"></Navigate>
                            )
                        }
                    ></Route>
                );
            }
        }

        if (route.routes && route.routes.length > 0) {
            return (
                <Route
                    key={route.path}
                    element={route.element}
                    path={route.path}
                >
                    {renderRoutes(route.routes)}
                </Route>
            );
        }

        if (route.redirect) {
            return (
                <Route
                    key={route.path}
                    element={<Navigate to={route.redirect}></Navigate>}
                    path={route.path}
                />
            );
        }

        return (
            <Route
                key={route.path}
                element={route.element}
                path={route.path}
            ></Route>
        );
    });
};

export default renderRoutes(routers);
