import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
            },

            {
                path: "/userTable",
                name: "userTable",
                meta: {
                    title: '用户表'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/UserTable.vue")
            },

            {
                path: "/foodManagerTable",
                name: "foodManagerTable",
                meta: {
                    title: '食材管理员表'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/FoodManagerTable.vue")
            },

            {
                path: "/supplierTable",
                name: "supplierTable",
                meta: {
                    title: '供货人表'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/SupplierTable.vue")
            },
            {
                path: "/supplyTable",
                name: "supplyTable",
                meta: {
                    title: '供应商表'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/SupplyTable.vue")
            },
            {
                path: "/foodTable",
                name: "foodTable",
                meta: {
                    title: '食材表'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/FoodTable.vue")
            },
            {
                path: "/nextSupplyTable",
                name: "nextSupplyTable",
                meta: {
                    title: '下次食材供应信息表'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/NextSupplyTable.vue")
            },
            {
                path: "/charts",
                name: "basecharts",
                meta: {
                    title: '图表'
                },
                component: () => import ( /* webpackChunkName: "charts" */ "../views/BaseCharts.vue")
            },

            {
                path: "/form",
                name: "baseform",
                meta: {
                    title: '表单'
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/BaseForm.vue")
            },

            {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: '消息管理'
                },
                component: () => import ( /* webpackChunkName: "tabs" */ "../views/Tabs.vue")
            },

            {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '权限管理',
                    permission: true
                },
                component: () => import ( /* webpackChunkName: "permission" */ "../views/Permission.vue")
            },

            {
                path: "/upload",
                name: "upload",
                meta: {
                    title: '上传插件'
                },
                component: () => import ( /* webpackChunkName: "upload" */ "../views/Upload.vue")
            },

            {
                path: "/icon",
                name: "icon",
                meta: {
                    title: '自定义图标'
                },
                component: () => import ( /* webpackChunkName: "icon" */ "../views/Icon.vue")
            },

            {
                path: '/404',
                name: '404',
                meta: {
                    title: '找不到页面'
                },
                component: () => import (/* webpackChunkName: "404" */ '../views/404.vue')
            },

            {
                path: '/403',
                name: '403',
                meta: {
                    title: '没有权限'
                },
                component: () => import (/* webpackChunkName: "403" */ '../views/403.vue')
            },

            {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心'
                },
                component: () => import (/* webpackChunkName: "user" */ '../views/User.vue')
            },

            {
                path: '/editor',
                name: 'editor',
                meta: {
                    title: '富文本编辑器'
                },
                component: () => import (/* webpackChunkName: "editor" */ '../views/Editor.vue')
            }
        ]
    },

    {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import ( /* webpackChunkName: "login" */ "../views/Login.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin'
            ? next()
            : next('/403');
    } else {
        next();
    }
});

export default router;