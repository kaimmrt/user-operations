import React from 'react'
import { Route, Switch } from "react-router-dom";
import asyncComponent from "../util/asyncComponent";

const App = ({ match }) => {
    return (
        <Switch>
            <Route path={`${match.url}sample`} component={asyncComponent(() => import('./UserList'))} />
            <Route path={`${match.url}user/:id`} component={asyncComponent(() => import('./User'))} />
        </Switch>
    )
}

export default App
