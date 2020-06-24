<template>
    <el-menu
        class="menu-box"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#409EFF"
        :default-active="activeMenu"
    >
        <div v-for="item in list" :key="item.path">
            <router-link :to="resolvePath(item.path)" v-if="!item.children">
                <el-menu-item :index="item.name">
                    <!-- 如果菜单栏中有icon就显示，没有就不显示 -->
                    <i :class="item.icon" v-if="item.icon"></i>
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </router-link>

            <el-submenu :index="item.name" v-else>
                <template slot="title">
                    <i :class="item.icon" v-if="item.icon"></i>
                    <span>{{ item.name }}</span>
                </template>
                <Sidebar
                    :menuList="item.children"
                    :isLeaf="true"
                    :basePath="resolvePath(item.path)"
                ></Sidebar>
            </el-submenu>
        </div>
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
 * @param menuList → menus.js中定义的sidebarMenu,初始值为空
 * @param isLeaf   → 判断是否是菜单中的叶子节点(即最后一个孩子)
 */

import path from 'path'
import { isExternal } from '@/utils/validates.js'
import sidebarMenu from '@/config/menu.js'
export default {
    name: 'Sidebar',
    props: {
        menuList: {
            type: Array,
            default: null
        },
        isLeaf: {
            type: Boolean,
            default: null
        },
        basePath: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            activeMenu: '1'
        }
    },
    mounted() {},
    computed: {
        list() {
            if (!this.menuList && !this.isLeaf) {
                return sidebarMenu
            }
            return this.menuList || null
        }
    },
    methods: {
        // 拼接路径
        resolvePath(routePath) {
            if (isExternal(routePath)) {
                return routePath
            }
            if (isExternal(this.basePath)) {
                return this.basePath
            }
            return path.resolve(this.basePath, routePath)
        }
    }
}
</script>

<style lang="less" scoped></style>
