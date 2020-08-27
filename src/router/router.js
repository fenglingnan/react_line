import { lazy } from 'react';
const Login = lazy (() => import('../views/user/Login'));
const Forget = lazy (() => import('../views/user/Forget'));
const Register = lazy (() => import('../views/user/Register'));
const NF = lazy (() => import('../common/404'));
const Home = lazy(()=>import('../views/Home'))
const Index = lazy(()=>import('../views/Index'))
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
        ]
    },
    {
        path:'*',
        component:NF
    }
]