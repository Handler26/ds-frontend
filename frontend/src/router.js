import { createWebHistory, createRouter } from "vue-router";
//import Home from "./components/Home.vue";
import LoginForm from "./components/Login.vue";
import RegisterForm from "./components/Register.vue";
// lazy-loaded
//const Profile = () => import("./components/Profile.vue")
const BoardTeacher = () => import("./components/BoardTeacher.vue")
const BoardSecretary = () => import("./components/BoardSecretary.vue")
const BoardStudent = () => import("./components/BoardStudent.vue")

const routes = [
    /* {
        path: "/",
        name: "home",
        component: Home,
    }, */
    {
        path: "/login",
        component: LoginForm,
    },
    {
        path: "/register",
        component: RegisterForm,
    },
    {
        path: "/teacher",
        name: "teacher",
        // lazy-loaded
        component: BoardTeacher,
    },
    {
        path: "/secretary",
        name: "secretary",
        // lazy-loaded
        component: BoardSecretary,
    },
    {
        path: "/student",
        name: "student",
        // lazy-loaded
        component: BoardStudent,
    }, 
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
