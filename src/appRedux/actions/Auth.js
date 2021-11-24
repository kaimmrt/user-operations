import {
    INIT_URL,
    AUTH_USER,
} from "./ActionTypes";

export const setInitUrl = (url) => {
    return {
        type: INIT_URL,
        payload: url
    };
};

export const setAuthUser = (data) => {
    return {
        type: AUTH_USER,
        payload: data
    };
};

