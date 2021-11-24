import { combineReducers } from "redux";
import Auth from "./Auth";
import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
    router: connectRouter(history),
    auth: Auth,
});