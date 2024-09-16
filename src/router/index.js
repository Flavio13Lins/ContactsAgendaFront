import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: function () {
      return import("../views/HomeView.vue");
    },
  },
  {
    path: "/contacts",
    name: "Contacts",
    component: function () {
      return import("../views/ContactsView.vue");
    },
  },
  {
    path: "/contacts/:contactId",
    name: "Details",
    params: true,
    component: function () {
      return import("../views/ContactDetailsView.vue");
    },
  },
  {
    path: "/new",
    name: "NewContact",
    component: function () {
      return import("../views/NewCotactView.vue");
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
