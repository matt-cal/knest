import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import { useUserStore } from "@/stores/user";
import CityView from "../views/CityView.vue";
import CreatePostViewVue from "../views/CreatePostView.vue";
import CreateReviewViewVue from "../views/CreateReviewView.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import MapView from "../views/MapView.vue";
import NeighborhoodViewVue from "../views/NeighborhoodView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import SettingView from "../views/SettingView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/setting",
      name: "Settings",
      component: SettingView,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: { requiresAuth: false },
      beforeEnter: (to, from) => {
        const { isLoggedIn } = storeToRefs(useUserStore());
        if (isLoggedIn.value) {
          return { name: "Settings" };
        }
      },
    },
    {
      path: "/map",
      name: "Map",
      component: MapView,
    },
    {
      path: "/neighborhood/:area",
      name: "Neighborhood",
      component: NeighborhoodViewVue,
      meta: { requiresAuth: true },
    },
    {
      path: "/city/:area",
      name: "City",
      component: CityView,
    },
    {
      path: "/CreatePost/:area",
      name: "CreatePost",
      component: CreatePostViewVue,
      meta: { requiresAuth: true },
    },
    {
      path: "/CreateReview/:area",
      name: "CreateReview",
      component: CreateReviewViewVue,
      meta: { requiresAuth: true },
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from) => {
  const { isLoggedIn } = storeToRefs(useUserStore());

  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return { name: "Login" };
  }
});

export default router;
