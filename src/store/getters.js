const getters = {
    token: (state) => state.user.token,
    username: (state) => state.user.username,
    sidebarMenu: (state) => state.user.sidebarMenu,
};
export default getters;
