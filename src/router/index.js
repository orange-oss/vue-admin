import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        component: () =>
            import(/*webpackChunkName: "login"*/ '@/page/Login.vue'),
        name: 'Login'
    },
    // 左侧导航栏sidebar部分
    // 首页
    {
        path: '/',
        component: () =>
            import(/*webpackChunkName: "indexpage"*/ '@/layout/index.vue'),
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'Home',
                component: () =>
                    import(/*webpackChunkName: "home"*/ '@/page/Home.vue'),
                meta: { title: '首页' }
            }
        ]
    },
    // 海报管理
    {
        path: '/banner',
        component: () => import('@/layout/index.vue'),
        redirect: '/banner/list',
        meta: { title: '海报管理' },
        children: [
            {
                path: 'list',
                component: () =>
                    import(
                        /*webpackChunkName: "list"*/ '@/page/banner/BannerList.vue'
                    ),
                meta: { title: '海报列表' }
            },
            {
                name: 'BannerDetail',
                path: 'detail',
                component: () =>
                    import(
                        /*webpackChunkName: "detail"*/ '@/page/banner/BannerDetail.vue'
                    ),
                meta: { title: '海报详情' }
            },
            {
                path: 'info',
                component: () =>
                    import(
                        /*webpackChunkName: "info"*/ '@/page/banner/BannerInfo.vue'
                    ),
                meta: { title: '添加海报' }
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    // base: process.env.BASE_URL,
    routes
})
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点击报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if (!token && to.path !== '/login') {
        next('/login')
    } else {
        next()
    }
})
export default router
