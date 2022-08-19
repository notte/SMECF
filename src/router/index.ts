import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    redirect: { name: "Dashboard" },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    components: {
      main: () => import("../views/DashboardView.vue"),
    },
  },
  {
    path: "/statistics",
    name: "Statistics",

    components: {
      main: () => import("../views/StatisticsView.vue"),
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
