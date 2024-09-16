<template>
  <div class="home">
    <WelcomeComponent />
  </div>
</template>

<script>
import WelcomeComponent from "@/components/WelcomeComponent.vue";

export default {
  name: "HomeView",
  components: {
    WelcomeComponent,
  },
};
</script>
