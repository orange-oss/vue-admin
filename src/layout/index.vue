<template>
    <div class="manage">
        <el-container>
            <el-aside width="200px" class="sidebar-box">
                <!-- 侧边栏组件 -->
                <Sidebar></Sidebar>
            </el-aside>
            <el-container>
                <header>
                    <!-- 头部logo部分组件 -->
                    <HeadLogo></HeadLogo>
                    <div class="nav-box">
                        <!-- 头部左侧面包屑 -->
                        <Breadcrumb></Breadcrumb>
                    </div>
                </header>
                <el-main class="content-box">
                    <!-- 内容组件 -->
                    <router-view></router-view>
                </el-main>
                <!-- 底部组件 -->
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Sidebar from '../components/common/Sidebar/index'
import HeadLogo from '../components/common/HeadLogo'
import Breadcrumb from '../components/common/Breadcrumb'
export default {
    name: 'Layout',
    data() {
        return {}
    },
    components: {
        Sidebar,
        HeadLogo,
        Breadcrumb
    }
}
</script>

<style lang="less" scoped>
@import '../theme/base.less';

.el-main {
    background-color: #e9eef3;
}

// 侧边栏导航

.sidebar-box {
    background-color: @baseColor;
    min-height: 100%;
    height: 100vh;
}

// 头部导航和面包屑部分
.nav-box {
    height: 70px;
    display: flex;
    align-items: center;
}
// 内容
.content-box {
    height: 60px;
}
</style>
