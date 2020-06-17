/**
 * 定义sidebar和header中的菜单项
 *
 * 一些约定:
 * 1.菜单最多3层;
 * 2.只有"叶子"节点才能跳转;
 * 3.所有的key都不能重复;
 */

// 定义左侧菜单栏siderbar菜单
const sidebarMenu = [
    {
        path: "/home", // route时url中的值
        name: "首页", // 在菜单中显示的名称
        icon: "el-icon-menu", // 图标是可选的
        show: true, // 是否显示此菜单 默认是true
    },
    {
        path: "/banner",
        name: "海报管理",
        icon: "el-icon-film",
        children: [
            {
                path: "list",
                name: "海报列表",
                icon: "el-icon-s-data",
            },
            {
                path: "info",
                name: "添加海报",
                icon: "el-icon-sell",
            },
        ],
    },
];

export default sidebarMenu;

