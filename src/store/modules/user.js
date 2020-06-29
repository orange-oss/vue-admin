import loginApi from '@/api/login.js'
import router from '@/router'
import sidebarMenu from '@/config/menu.js'
const state = {
    username: sessionStorage.getItem('username') || [],
    token: sessionStorage.getItem('token') || [],
    sidebarMenu: JSON.parse(sessionStorage.getItem('sidebarMenu')) || [] // 侧边栏导航权限
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_USERNAME: (state, username) => {
        state.username = username
    },
    SET_SIDEBARMENU: (state, sidebarMenu) => {
        state.sidebarMenu = sidebarMenu
    }
}

const actions = {
    // 登录权限处理逻辑
    login({ commit }, userInfo) {
        const { username } = userInfo
        return new Promise((resolve, reject) => {
            loginApi
                .login(userInfo)
                .then(response => {
                    console.log(response)
                    const token = '123456'
                    // 普通用户和高级用户两种角色
                    // 普通用户没有下载海报的功能
                    sidebarMenu[1].children[2].show = false
                    sessionStorage.setItem('token', token)
                    sessionStorage.setItem('username', username)
                    sessionStorage.setItem(
                        'sidebarMenu',
                        JSON.stringify(sidebarMenu)
                    )
                    commit('SET_TOKEN', token)
                    commit('SET_USERNAME', username)
                    commit('SET_SIDEBARMENU', sidebarMenu)
                    router.push({
                        name: 'Home'
                    })
                    resolve()
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    // 登出清空数据逻辑
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
