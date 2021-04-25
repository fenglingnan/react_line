/*
 * @Description: 
 * @Version: 1.0.0
 * @Author: ljx
 * @Date: 2020-07-22 23:00:10
 * @LastEditors: ljx
 * @LastEditTime: 2021-04-25 14:09:29
 */
import { lazy } from 'react';
const Login = lazy (() => import('../views/user/Login'));
const Forget = lazy (() => import('../views/user/Forget'));
const Register = lazy (() => import('../views/user/Register'));
const Info = lazy (() => import('../views/user/Info'));
const NF = lazy (() => import('../common/404'));
const Home = lazy(()=>import('../views/Home'))
const Index = lazy(()=>import('../views/Index'))
const Clock = lazy(()=>import('../views/canvas/Clock'))
const Cross = lazy(()=>import('../views/canvas/Cross'))
const Tree = lazy(()=>import('../views/love/Tree'))
const Diary = lazy(()=>import('../views/love/Diary'))
const Legal = lazy(()=>import('../views/business/Legal'))

export const routeConfig = [
    { 
        path: '/',
        component: Login,
        exact: true,
    },
    {
        path: '/Forget',
        component: Forget,
    },
    {
        path: '/Register',
        component: Register,
    },
    {
        path: '/Home',
        component: Home,
        routes:[
            {
                path: '/Home/Index',
                component: Index
            },
            {
                path: '/Home/Clock',
                component: Clock
            },
            {
                path: '/Home/Tree',
                component: Tree
            },
            {
                path: '/Home/Diary',
                component: Diary
            },
            {
                path: '/Home/Cross',
                component: Cross
            },
            {
                path: '/Home/Legal',
                component: Legal
            },
        ]
    },
    {
        path: '/Info',
        component: Info
    },
    {
        path:'*',
        component:NF
    }
]