<template>
    <div>
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
            <menu-item
                v-for="i in item.children"
                :item="i"
                :key="i.path"
                :isLeaf="true"
                :basePath="resolvePath(item.path)"
            ></menu-item>
        </el-submenu>
    </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validates.js'
export default {
    name: 'MenuItem',
    props: {
        item: {
            type: Object,
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

<style></style>
