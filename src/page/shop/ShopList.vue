<template>
    <div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="rankName" label="店铺名称" width="180">
            </el-table-column>
            <el-table-column prop="rankId" label="店铺地址" width="180">
            </el-table-column>
            <el-table-column prop="coverImgs" label="店铺介绍">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import shopApi from "@/api/shop.js";
export default {
    name: "ShopList",
    data() {
        return {
            tableData: [
                {
                    name: "蜜雪冰城",
                    address: "上海市普陀区金沙江路 1518 弄",
                    info: "蜜雪冰城，夏季新品，欢迎品尝！",
                },
                {
                    name: "蜜雪冰城",
                    address: "上海市普陀区金沙江路 1518 弄",
                    info: "蜜雪冰城，夏季新品，欢迎品尝！",
                },
                {
                    name: "蜜雪冰城",
                    address: "上海市普陀区金沙江路 1518 弄",
                    info: "蜜雪冰城，夏季新品，欢迎品尝！",
                },
                {
                    name: "蜜雪冰城",
                    address: "上海市普陀区金沙江路 1518 弄",
                    info: "蜜雪冰城，夏季新品，欢迎品尝！",
                },
                {
                    name: "蜜雪冰城",
                    address: "上海市普陀区金沙江路 1518 弄",
                    info: "蜜雪冰城，夏季新品，欢迎品尝！",
                },
                {
                    name: "蜜雪冰城",
                    address: "上海市普陀区金沙江路 1518 弄",
                    info: "蜜雪冰城，夏季新品，欢迎品尝！",
                },
                {
                    name: "蜜雪冰城",
                    address: "上海市普陀区金沙江路 1518 弄",
                    info: "蜜雪冰城，夏季新品，欢迎品尝！",
                },
                {
                    name: "蜜雪冰城",
                    address: "上海市普陀区金沙江路 1518 弄",
                    info: "蜜雪冰城，夏季新品，欢迎品尝！",
                },
                {
                    name: "蜜雪冰城",
                    address: "上海市普陀区金沙江路 1518 弄",
                    info: "蜜雪冰城，夏季新品，欢迎品尝！",
                },
                {
                    name: "蜜雪冰城",
                    address: "上海市普陀区金沙江路 1518 弄",
                    info: "蜜雪冰城，夏季新品，欢迎品尝！",
                },
                {
                    name: "蜜雪冰城",
                    address: "上海市普陀区金沙江路 1518 弄",
                    info: "蜜雪冰城，夏季新品，欢迎品尝！",
                },
                {
                    name: "蜜雪冰城",
                    address: "上海市普陀区金沙江路 1518 弄",
                    info: "蜜雪冰城，夏季新品，欢迎品尝！",
                },
                {
                    name: "蜜雪冰城",
                    address: "上海市普陀区金沙江路 1518 弄",
                    info: "蜜雪冰城，夏季新品，欢迎品尝！",
                },
                {
                    name: "蜜雪冰城",
                    address: "上海市普陀区金沙江路 1518 弄",
                    info: "蜜雪冰城，夏季新品，欢迎品尝！",
                },
            ],
        };
    },
    created() {
        this.loadShopList();
    },
    methods: {
        loadShopList() {
            shopApi.list().then((res) => {
                if (res.result.code === 0) {
                    console.log(res.data.channels[0].ranks);
                    this.tableData = res.data.channels[0].ranks;
                } else {
                    console.log(res.result.msg);
                }
            });
        },
    },
};
</script>

<style lang="less" scoped></style>
