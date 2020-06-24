<template>
    <PictureDownload :uploadUrl="uploadUrl" :imageName="imageName">
    </PictureDownload>
</template>

<script>
import PictureDownload from '@/components/common/PictureDownload'
export default {
    name: 'BannerDown',
    components: {
        PictureDownload
    },
    data() {
        return {
            uploadUrl:
                'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3790014455,2670545218&fm=26&gp=0.jpg',
            imageName: '小花伞'
        }
    },
    methods: {}
}
</script>

<style lang="less" scoped></style>
