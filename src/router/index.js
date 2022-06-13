import {createRouter, createWebHashHistory} from "vue-router";
import {ElNotification} from 'element-plus'
import store from '@/store'

const routes = [
    {path: '/', redirect: '/blood'},
    {
        path: '/blood/', component: () => import('@/Page/Home'),
        children: [
            {path: '', redirect: '/blood/home'},
            {path: 'home', component: () => import('@/Page/Home')},
        ]
    },
    {path: '/blood/userInfo', component: () => import('@/Page/UserInfo.vue'), meta: {title: '用户信息'}},
    {path: '/login', component: () => import('@/Page/Login.vue'), meta: {title: '登陆'}},
    {
        path: '/backstage', component: () => import('@/Page/Backstage/BackHomePage'),
        beforeEnter: () => {
            // 如果store.state.user是undefined返回false，正常返回他的权限是否等于ROLE_ADMIN
            if (store.state.user ? false : store.state.user.authorities[0].authority === 'ROLE_ADMIN') {
                ElNotification({
                    message: '用户权限不足',
                    type: 'error'
                })
                return {path: '/'}
            }
        },
        children: [
            {path: '', redirect: '/backstage/home'},
            {path: 'home', component: () => import('@/Page/Backstage/BackHomePage')},
            {path: 'userMan', component: () => import('@/Page/Backstage/admin/UserMan'), meta: {title: '用户管理'}},
            {
                path: 'bloodManagement',
                component: () => import('@/Page/Backstage/admin/BloodManagement'),
                meta: {title: '血液管理'}
            },
            {path: 'takeBlood', component: () => import('@/Page/Backstage/doctor/BloodUser'), meta: {title: '抽血化验'}}
        ]
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    let title = 'MeowBlog'
    if (to.meta.params) {
        title = `${to.params[to.meta.params] || ''} - ${title}`
    } else {
        title = `${to.meta.title} - ${title}`
    }
    document.title = title
    if (to.path !== from.path) {
        store.commit('SET_LOADING', true);
    }
    next();
})
router.afterEach(() => {
    // 最多延迟 关闭 loading
    setTimeout(() => {
        store.commit('SET_LOADING', false);
    }, 1500)
})

// 导航转成路由
export default router
