<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="店铺名称">
                <el-input v-model="form.name" class="input-text"></el-input>
            </el-form-item>
            <el-form-item label="店铺地址">
                <el-input v-model="form.address" class="input-text"></el-input>
            </el-form-item>
            <el-form-item label="店铺介绍">
                <el-input
                    v-model="form.introduce"
                    class="input-text"
                ></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'ShopDetail',
    data() {
        return {
            form: {
                name: this.$route.query.categoryName,
                address: this.$route.query.categoryId,
                introduce: this.$route.query.cover
            }
        }
    },
    created() {}
}
</script>

<style lang="less" scoped>
.input-text {
    width: 300px;
}
</style>
