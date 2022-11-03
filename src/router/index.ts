import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ProjectView from '@/views/ProjectView.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/project/:projectId',
        name: 'project',
        component: ProjectView,
        props: true
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router