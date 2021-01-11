import { lazy } from 'react';
const Login = lazy (() => import('../views/user/Login'));
const Forget = lazy (() => import('../views/user/Forget'));
const Register = lazy (() => import('../views/user/Register'));
const Info = lazy (() => import('../views/user/Info'));
const NF = lazy (() => import('../common/404'));
const Home = lazy(()=>import('../views/Home'))
const Index = lazy(()=>import('../views/Index'))
const Clock = lazy(()=>import('../views/canvas/Clock'))
const Tree = lazy(()=>import('../views/love/Tree'))
const Diary = lazy(()=>import('../views/love/Diary'))
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