import router from '@/router'
const state = {
    userName: sessionStorage.getItem('userName') || [],
    token: sessionStorage.getItem('token') || []
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_USERNAME: (state, userName) => {
        state.userName = userName
    }
}

const actions = {
    saveToken({ commit }, token) {
        commit('SET_TOKEN', token)
    },
    saveUserName({ commit }, userName) {
        commit('SET_USERNAME', userName)
    },
    logOut({ commit }) {
        commit('SET_TOKEN', '')
        commit('SET_USERNAME', '')
        sessionStorage.clear()
        router.push({
            name: 'Login'
        })
    }
}
export default {
    // 命名空间
    namespaced: true,
    state,
    mutations,
    actions
}
