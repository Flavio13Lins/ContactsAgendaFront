<template>
  <div>
    <div v-if="isMobile" class="welcome-mobile">
      <h1>Welcome to the Contact Agenda</h1>
      <p>Manage your contacts easily on your mobile device.</p>
      <router-link to="/contacts" class="btn-mobile">Get Started</router-link>
    </div>
    <div v-else class="welcome-web">
      <h1>Welcome to the Contact Agenda</h1>
      <p>Manage your contacts easily on your web browser.</p>
      <router-link to="/contacts" class="btn-web">Get Started</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "WelcomeComponent",
  data() {
    return {
      isMobile: false,
    };
  },
  mounted() {
    this.checkIfMobile();
    window.addEventListener("resize", this.checkIfMobile);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkIfMobile);
  },
  methods: {
    checkIfMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
  },
};
</script>

<style scoped>
.welcome-web {
  text-align: center;
  padding: 50px;
}

.welcome-mobile {
  text-align: center;
  padding: 20px;
}

.btn-web {
  display: inline-block;
  padding: 10px 20px;
  margin-top: 20px;
  color: #4297b9;
  text-decoration: none;
  border-radius: 5px;
}

.btn-mobile {
  display: inline-block;
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #4297b9;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

/* Additional media queries for more specific styling */
@media (max-width: 768px) {
  .welcome-web {
    display: none;
  }
  .welcome-mobile {
    display: block;
  }
}
</style>
