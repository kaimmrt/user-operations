import React, { memo, useEffect } from 'react'
import { ConfigProvider } from 'antd';
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setInitUrl } from "../../appRedux/actions/Auth";
import { setAuthUser } from "../../appRedux/actions";
import { get } from '../../networking/Server'

import SignIn from "../SignIn";
import SignUp from "../SignUp";
import MainApp from "./MainApp";

const RestrictedRoute = ({ component: Component, location, authUser, ...rest }) =>
    <Route
        {...rest}
        render={props =>
            authUser
                ? <Component {...props} />
                :
                <Redirect
                    to={{
                        pathname: '/signin',
                        state: { from: location }
                    }}
                />}
    />;


const App = () => {
    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();
    const dispatch = useDispatch();


    const { initURL, authUser } = useSelector(({ auth }) => auth);

    useEffect(() => {

        if (initURL === '') {
            dispatch(setInitUrl(location.pathname));
        }
    }, [dispatch, initURL, location.pathname]);

    useEffect(() => {
        console.log(authUser)
    }, [])

    useEffect(() => {
        dispatch(setAuthUser(localStorage.getItem("authUser")));
    }, [dispatch]);

    useEffect(() => {

        if (location.pathname === '/') {
            if (authUser === null) {

                history.push('/signin');
            } else if (initURL === '' || initURL === '/' || initURL === '/signin') {
                history.push('/sample');
            } else {
                history.push(initURL);
            }
        }
    }, [authUser, initURL, location, history]);

    return (
        <ConfigProvider>
            <Switch>
                <Route exact path='/signin' component={SignIn} />
                <Route exact path='/signup' component={SignUp} />
                <RestrictedRoute path={`${match.url}`} authUser={authUser} location={location} component={MainApp} />
            </Switch>
        </ConfigProvider>
    )
}

export default memo(App);
