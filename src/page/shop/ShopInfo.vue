<template>
    <div>
        <el-upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
        >
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'ShopInfo',
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false
        }
    },
    methods: {
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url
            this.dialogVisible = true
        }
    }
}
</script>

<style lang="less" scoped></style>
