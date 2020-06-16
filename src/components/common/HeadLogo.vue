<template>
    <div class="head-box">
        <span>欢迎您 , {{ userName }}</span>
        <span class="sign-out" @click="logOut">退出</span>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'HeadLogo',
    computed: {
        ...mapGetters(['userName']),
    },
    methods: {
        logOut() {
            this.$store.dispatch('user/logOut')
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../theme/base.less';
.head-box {
    height: 60px;
    background-color: @headBarColor;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .sign-out {
        cursor: pointer;
        color: #007cf9;
        margin-left: 20px;
    }
}
</style>
