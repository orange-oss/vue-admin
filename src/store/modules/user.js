import router from '@/router'
const state = {
    userName: sessionStorage.getItem('userName') || [],
    token: sessionStorage.getItem('token') || [],
    sidebarMenu: JSON.parse(sessionStorage.getItem('sidebarMenu')) || [] // 侧边栏导航权限
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_USERNAME: (state, userName) => {
        state.userName = userName
    },
    SET_SIDEBARMENU: (state, sidebarMenu) => {
        state.sidebarMenu = sidebarMenu
    }
}

const actions = {
    saveToken({ commit }, token) {
        commit('SET_TOKEN', token)
    },
    saveUserName({ commit }, userName) {
        commit('SET_USERNAME', userName)
    },
    saveSidebarMenu({ commit }, sidebarMenu) {
        commit('SET_SIDEBARMENU', sidebarMenu)
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
