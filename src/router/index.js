import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/page/Login.vue'
// 公共侧边栏+头部+底部
import Layout from '../layout/index.vue'
// 首页部分
import Home from '../page/Home.vue'
// 左侧菜单 商家管理 商家列表部分
import ShopList from '../page/shop/ShopList.vue'
// 左侧菜单 商家管理 商家列表 商家详情部分
import ShopDetail from '../page/shop/ShopDetail.vue'
// 左侧菜单 商家管理 商家信息部分
import ShopInfo from '@/page/shop/ShopInfo.vue'
// 头部菜单 人员信息部分
import Message from '../page/message/index.vue'
// 头部菜单 订单管理 订单列表部分
import OrderList from '../page/order/OrderList.vue'
Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        component: Login,
        name: 'Login'
    },
    // 左侧导航栏sidebar部分
    // 首页
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'Home',
                component: Home,
                meta: { title: '首页' }
            }
        ]
    },
    // 商家管理
    {
        path: '/shop',
        component: Layout,
        redirect: '/shop/list',
        meta: { title: '商家管理' },
        children: [
            {
                path: 'list',
                component: ShopList,
                meta: { title: '商家列表' }
            },
            {
                name: 'ShopDetail',
                path: 'detail',
                component: ShopDetail,
                meta: { title: '商家详情' }
            },
            {
                path: 'info',
                component: ShopInfo,
                meta: { title: '商家信息' }
            }
        ]
    },
    // 头部导航栏navbar部分
    // 人员信息
    {
        path: '/message',
        component: Layout,
        children: [
            {
                path: '/message',
                component: Message,
                meta: { title: '人员信息' }
            }
        ]
    },
    // 订单管理
    {
        path: '/order',
        component: Layout,
        redirect: '/order/list',
        meta: { title: '订单管理' },
        children: [
            {
                path: 'list',
                component: OrderList,
                meta: { title: '订单列表' }
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
