<template>
    <div>
        <div id="editorElem"></div>
    </div>
</template>

<script>
import E from 'wangeditor'
export default {
    name: 'Editor',
    mounted() {
        const editor = new E('#editorElem')
        // 上传图片到服务器
        editor.customConfig.uploadImgServer = '/upload'
        editor.create()
    }
}
</script>

<style lang="less" scoped></style>
