import { lazy } from 'react';
const Login = lazy (() => import('../views/user/Login'));
const Forget = lazy (() => import('../views/user/Forget'));
const Register = lazy (() => import('../views/user/Register'));
const NF = lazy (() => import('../common/404'));
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
        path:'*',
        component:NF
    }
]