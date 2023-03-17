import { createRouter, createWebHistory, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import routes from './routes';
const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  // 访问不存在的页面
  if (to.matched.length === 0) {
    next('/');
  } else {
    next();
  }
});

export default router;
