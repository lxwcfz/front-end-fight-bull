import store from './index';
import * as actionTypes from '@/store/actionTypes';

export const dispatchSetLoginUser = (loginUser: RoleInfo) => {
    return store.dispatch(actionTypes.SET_LOGIN_USER, loginUser);
}