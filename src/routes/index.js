import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/auth.views.vue'
import Dashboard from '../views/dashboard.views.vue'
import CreateOrderView from '../views/createOrder.views.vue'

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path: "/login",
            name:"login",
            component:AuthView
        },
        {
            path: "/",
            name:"home",
            component:Dashboard
        },
        {
            path:"/create",
            component: CreateOrderView
        }
    ],
})

/*router.beforeEach((to, from, next) =>{
    if(to.name == "login" && sessionStorage.token && sessionStorage.token.trim().length != 0){
        router.push("/");
    }
})*/

/*router.beforeEach((to, from, next) =>{
    if(to.name != "login" && router.app.$session.exists()){
        router.push("/login")
    }
    next()
})*/
export default router