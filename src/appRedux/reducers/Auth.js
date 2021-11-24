import { INIT_URL, AUTH_USER } from "../actions/ActionTypes";

const INIT_STATE = {
    token: localStorage.getItem('user_id'),
    initURL: '',
    authUser: null,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case INIT_URL: {
            return { ...state, initURL: action.payload };
        }

        case AUTH_USER: {
            return { ...state, authUser: action.payload };
        }

        default:
            return state;
    }
}