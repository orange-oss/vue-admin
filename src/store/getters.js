const getters = {
    token: (state) => state.user.token,
    userName: (state) => state.user.userName,
    sidebarMenu: (state) => state.user.sidebarMenu,
};
export default getters;
