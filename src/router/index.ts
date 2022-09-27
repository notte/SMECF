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
  {
    path: "/demo",
    name: "demo",

    components: {
      main: () => import("../components/common/DetailPopup.vue"),
    },
  },
  {
    path: "/list",
    name: "list",

    components: {
      main: () => import("../components/common/ListPopup.vue"),
    },
  },
  {
    path: "/donutpie",
    name: "donutpie",
    components: {
      main: () => import("../components/dashboard/Other/Other.vue"),
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(from.path, to.path);
  // if (
  //   from.name == undefined &&
  //   to.name === "Statistics" &&
  //   sessionStorage.getItem("tab")
  // ) {
  //   next({ name: "Dashboard" });
  // }
  next();
});

export default router;
