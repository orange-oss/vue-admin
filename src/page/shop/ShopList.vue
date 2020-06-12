<template>
    <div>
        <!-- 表格头部 搜索和筛选部分 -->
        <div class="search-box">
            <!-- 筛选下拉框 -->
            <el-select
                v-model="searchSelect"
                placeholder="请选择"
                @change="changeSelect"
            >
                <el-option
                    v-for="item in tableData"
                    :key="item.categoryId"
                    :label="item.categoryName"
                    :value="item.categoryId"
                >
                </el-option>
            </el-select>
            <!-- 输入搜索框 -->
            <el-input
                v-model="searchText"
                placeholder="请输入内容"
                class="search-text"
            ></el-input>
            <!-- 搜索按钮 -->
            <el-button type="primary" icon="el-icon-search" @click="searchBtn"
                >搜索</el-button
            >
        </div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="categoryName" label="店铺名称" width="180">
            </el-table-column>
            <el-table-column prop="categoryId" label="店铺地址" width="180">
            </el-table-column>
            <el-table-column prop="cover" label="店铺介绍" width="180">
            </el-table-column>
            <el-table-column prop="" label="店铺图片" width="180">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="pageCount"
            :current-page="currentPage"
            :pager-count="5"
            @current-change="handleChange"
        >
        </el-pagination>
    </div>
</template>

<script>
import shopApi from "@/api/shop.js";
export default {
    name: "ShopList",
    data() {
        return {
            // 当前点击页
            currentPage: 1,
            // 一页几条数据
            pageCount: 2,
            // 筛选下拉框部分
            searchSelect: "",
            // 输入搜索框部分
            searchText: "",
            // 表格数据
            tableData: [
                {
                    categoryName: "门店1",
                    categoryId: "id1",
                    cover:
                        "http://t9.baidu.com/it/u=1307125826,3433407105&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg",
                },
                {
                    categoryName: "门店2",
                    categoryId: "id2",
                    cover:
                        "http://t9.baidu.com/it/u=1307125826,3433407105&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg",
                },
            ],
            // 一共多少条
            total: 0,
            // 搜索的内容
            search: "",
            // 定义一个空对象 有参数就累加
            filter: {},
        };
    },
    created() {
        // this.loadShopList();
    },
    methods: {
        // 分页渲染接口
        loadShopList(objParam = {}) {
            const param = {
                pageNum: this.currentPage,
                pageSize: this.pageCount,
            };
            Object.assign(param, objParam);
            shopApi.list(param).then((data) => {
                this.tableData = data.list;
                this.total = data.total;
            });
        },

        // 拿到当前点击的页数
        handleChange(value) {
            this.currentPage = value;
            this.loadShopList();
        },

        // 表格头部 选择下拉框部分
        changeSelect() {
            Object.assign(this.filter, { searchSelect: this.searchSelect });
            this.loadShopList(this.filter);
        },

        // 表格头部 搜索部分
        searchBtn() {
            Object.assign(this.filter, { keyWord: this.searchText });
            this.loadShopList(this.filter);
        },

        // 操作部分逻辑
        // 点击编辑
        handleEdit(index, row) {
            console.log(index, row);
            this.$router.push({
                name: "ShopDetail",
                query: this.tableData[index],
            });
        },
    },
};
</script>

<style lang="less" scoped>
// 表格头部 搜索部分样式
.search-box {
    display: flex;
    .search-text {
        width: 228px;
    }
}
</style>
