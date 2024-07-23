import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/user",
      component: () => import("@/views/user/BasicView.vue"),
      children: [
        {
          path: "login",
          component: () => import("@/views/user/UserLogin.vue"),
        },
        {
          path: "register",
          component: () => import("@/views/user/UserRegister.vue"),
        },
      ],
    },
    {
      path: "/uvu",
      component: () => import("@/views/FlowCenter.vue"),
    },
  ],
});

export default router;
