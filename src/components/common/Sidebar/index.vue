<template>
    <el-menu
        class="menu-box"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#409EFF"
        :default-active="activeMenu"
    >
        <menu-item
            v-for="item in list"
            :key="item.path"
            :item="item"
        ></menu-item>
    </el-menu>
</template>

<script>
/**
 * 定义左侧导航侧边栏公共组件
 * Sidebar
 * 一些约定:
 * 1.菜单最多3层;item
 * 2.只有"叶子"节点才能跳转;
 * 3.所有的key都不能重复;
// @param menuList → menus.js中定义的sidebarMenu,初始值为空
 * @param isLeaf   → 判断是否是菜单中的叶子节点(即最后一个孩子)
 */
import MenuItem from './item'
// import sidebarMenu from '@/config/menu.js'
import { mapGetters } from 'vuex'
export default {
    name: 'Sidebar',
    components: {
        MenuItem
    },
    data() {
        return {
            activeMenu: '1'
        }
    },
    mounted() {},
    computed: {
        ...mapGetters(['sidebarMenu']),
        list() {
            console.log(this.sidebarMenu)
            if (!this.menuList && !this.isLeaf) {
                return this.sidebarMenu
            }
            return this.menuList || null
        }
    }
}
</script>

<style lang="less" scoped></style>
