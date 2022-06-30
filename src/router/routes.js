import adminLogin from "@/components/adminLogin";
import HelloWorld from "@/components/HelloWorld";
import userRegister from "@/components/userRegister";
import userIndex from "@/components/userIndex";
import adminIndex from "@/components/adminIndex";

const routes = [

    {
        path: '/',
        redirect: "/login"
    },
    {
        name: 'userIndex',
        path: '/userIndex',
        component: userIndex
    },
    {
        name: 'userRegister',
        path: '/userRegister',
        component: userRegister
    },
    {
        name: 'adminLogin',
        path: '/adminLogin',
        component: adminLogin
    },
    {
        name: 'adminIndex',
        path: '/adminIndex',
        component: adminIndex
    },
    {
        path: '/login',
        name: 'login',
        component: HelloWorld
    },
];

export default routes
