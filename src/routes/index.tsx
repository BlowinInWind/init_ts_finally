/** @format */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import routers, { RouterConfig } from './routerConfigs';

const renderRoutes = (routes: RouterConfig[]) => {
    return (
        routes && (
            <Switch>
                {routes.map((route: RouterConfig, i) => {
                    return (
                        <Route
                            key={route.key || i}
                            exact={route.exact}
                            path={route.path}
                            render={props => {
                                if (route.auth) {
                                    if (!localStorage.getItem('name')) {
                                        return (
                                            <Redirect to="/login"></Redirect>
                                        );
                                    }
                                }
                                return route.routes &&
                                    route.routes.length > 0 ? (
                                    <route.component {...props}>
                                        <Switch>
                                            {renderRoutes(route.routes)}
                                        </Switch>
                                        {route.redirect && (
                                            <Redirect
                                                to={route.redirect}
                                            ></Redirect>
                                        )}
                                    </route.component>
                                ) : (
                                    <>
                                        {route.redirect ? (
                                            <Redirect
                                                to={route.redirect}
                                            ></Redirect>
                                        ) : (
                                            <route.component
                                                {...props}
                                            ></route.component>
                                        )}
                                    </>
                                );
                            }}
                            strict={route.strict}
                        ></Route>
                    );
                })}
            </Switch>
        )
    );
};

export default () => renderRoutes(routers);
