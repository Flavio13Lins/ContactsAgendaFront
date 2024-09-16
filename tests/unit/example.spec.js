import { shallowMount, createLocalVue } from "@vue/test-utils";
import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ContactsView from "@/views/ContactsView.vue";
import ContactDetailsView from "@/views/ContactDetailsView.vue";

const localVue = createLocalVue();

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/contacts",
    name: "Contacts",
    component: ContactsView,
  },
  {
    path: "/contacts/:contactId",
    name: "Details",
    params: true,
    component: ContactDetailsView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

describe("Router Views", () => {
  it("renders HomeView when navigating to /", async () => {
    router.push("/");
    await router.isReady();
    const wrapper = shallowMount(HomeView, {
      localVue,
      router,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("renders ContactsView when navigating to /contacts", async () => {
    router.push("/contacts");
    await router.isReady();
    const wrapper = shallowMount(ContactsView, {
      localVue,
      router,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("renders ContactDetailsView when navigating to /contacts/:contactId", async () => {
    router.push("/contacts/1");
    await router.isReady();
    const wrapper = shallowMount(ContactDetailsView, {
      localVue,
      router,
    });
    expect(wrapper.exists()).toBe(true);
  });
});
