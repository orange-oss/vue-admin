<template>
    <div>
        <img :src="uploadUrl" alt="" class="img-box" />
        <div class="btn-box">
            <div>{{ imageName }}</div>
            <el-button type="primary" @click="handlePicture" class="down-btn"
                >下载</el-button
            >
        </div>
    </div>
</template>

<script>
/**
 * 定义下载图片公共组件
 * PictureDownload
 * 一些约定:
 * @param uploadUrl → 父组件传入的图片的url 即axios请求的路径
 * @param imageName → 父组件传入的图片的名字
 */
import downloadApi from '@/api/download.js'
import { getCaption } from '@/utils/validates.js'
export default {
    name: 'BannerDown',
    props: {
        uploadUrl: {
            type: String,
            default: ''
        },
        imageName: {
            type: String,
            default: '图片'
        }
    },
    methods: {
        handlePicture() {
            downloadApi.download(this.uploadUrl).then(data => {
                // data是请求url拿到的response是图片的二进制流 即blob
                // getCaption是validates中定义的截取字符串的方法 将image/jpeg 截取成jpeg 图片格式
                const imageFormat = getCaption(data.type, '/')
                let a = document.createElement('a') // 下载图片
                a.href = window.URL.createObjectURL(data) // 图片地址
                a.download = `${this.imageName}.${imageFormat}` // 图片名字
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
            })
        }
    }
}
</script>

<style lang="less" scoped>
.img-box {
    width: 350px;
    height: 300px;
}
.btn-box {
    width: 350px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
}
</style>
