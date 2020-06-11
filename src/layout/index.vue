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
                    <div class="head-box"></div>
                    <div class="nav-box">
                        <!-- 头部左侧面包屑 -->
                        <Breadcrumb class="breadcrumb-box"></Breadcrumb>
                        <!-- 头部导航组件 -->
                        <Navbar class="navbar-box"></Navbar>
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
import Sidebar from "../components/common/Sidebar";
import Breadcrumb from "../components/common/Breadcrumb";
import Navbar from "../components/common/Navbar";
export default {
    name: "Layout",
    data() {
        return {};
    },
    components: {
        Sidebar,
        Breadcrumb,
        Navbar,
    },
};
</script>

<style lang="less" scoped>
.el-main {
    background-color: #e9eef3;
}

// 侧边栏导航
.sidebar-box {
    background-color: #324157;
    min-height: 100%;
    // max-height: 100%;
    height: 100vh;
}
// 头部logo 部分
.head-box {
    height: 60px;
    background-color: #324157;
}
// 头部导航和面包屑部分
.nav-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.breadcrumb-box {
    line-height: 90px;
}
// 内容
.content-box {
    height: 60px;
}
</style>
