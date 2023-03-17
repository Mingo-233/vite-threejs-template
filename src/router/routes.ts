import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home/index.vue'),
  },
  {
    path: '/planetWorld',
    name: 'planetWorld',
    component: () => import('@/pages/planetWorld/index.vue'),
  },
];

export default routes;
