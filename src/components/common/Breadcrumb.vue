<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in breadList" :key="item.index">
                <span
                    v-if="item.meta.title"
                    class="bread-title"
                    @click="handleLink(item)"
                    >{{ item.meta.title }}</span
                >
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
/**
 * 定义头部面包屑公共组件
 * Breadcrumb
// @param breadList → router中的路由配置
 */
export default {
    name: "Breadcrumb",
    data() {
        return {
            breadList: null,
        };
    },
    watch: {
        $route() {
            this.getBreadcrumb();
        },
    },
    created() {
        this.getBreadcrumb();
    },
    methods: {
        // 获取路由配置array
        getBreadcrumb() {
            this.breadList = this.$route.matched.filter(
                (item) => item.meta && item.meta.title
            );
        },
        // 点击面包屑实现路由跳转
        handleLink(item) {
            const { path } = item;
            this.$router.push(path);
        },
    },
};
</script>

<style lang="less" scoped>
.bread-title {
    cursor: pointer;
}
</style>
