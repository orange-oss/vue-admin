<template>
    <div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="categoryName" label="店铺名称" width="180">
            </el-table-column>
            <el-table-column prop="categoryId" label="店铺地址" width="180">
            </el-table-column>
            <!-- <el-table-column prop="word" label="店铺介绍"> </el-table-column> -->
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
            tableData: [],
            currentPage: 1,
            pageCount: 2,
            total: 0,
        };
    },
    created() {
        this.loadShopList();
    },
    methods: {
        loadShopList() {
            const param = {
                pageNum: this.currentPage,
                pageSize: this.pageCount,
            };
            shopApi.list(param).then((data) => {
                this.tableData = data.list;
                this.total = data.total;
            });
        },

        // 拿到当前点击得页数
        handleChange(val) {
            this.currentPage = val;
            this.loadShopList();
        },
    },
};
</script>

<style lang="less" scoped></style>
