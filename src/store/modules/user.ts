import { getStorage, setStorage } from "@/utils/storage";
import * as mutationTypes from '@/store/mutationTypes';
import * as actionTypes from '@/store/actionTypes';
import { storageName } from '@/config/config';
import { Commit } from 'vuex';

const userInfo: RoleInfo = getStorage(storageName) || {};

export interface State {
    loginUser: RoleInfo
}

const initState: State = {
    loginUser: userInfo
}

const actions = {
    [actionTypes.SET_LOGIN_USER](context: { commit: Commit, state: State }, loginUser: RoleInfo) {
        context.commit(mutationTypes.SET_LOGIN_USER, loginUser);
    }
}

const mutations = {
    [mutationTypes.SET_LOGIN_USER](state: State, loginUser: RoleInfo) {
        setStorage(storageName, loginUser);
        state.loginUser = loginUser;
    }
}

const getters = {
    token: (state: State) => state.loginUser.token,
    loginUser: (state: State) => state.loginUser
}

export default {
    state: initState,
    mutations,
    getters,
    actions
}