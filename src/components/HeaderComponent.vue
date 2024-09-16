<template>
  <div>
    <div v-if="isMobile" id="nav-mobile">
      <div class="h-mobile">
        <button @click="toggleMobileMenu" class="hamburger">☰</button>
      </div>
      <div v-if="mobileMenuOpen" class="mobile-menu">
        <router-link to="/" @click="toggleMobileMenu">Home</router-link>
        <router-link to="/contacts" @click="toggleMobileMenu"
          >Contacts</router-link
        >
        <router-link to="/new" @click="toggleMobileMenu"
          >New Contact</router-link
        >
      </div>
    </div>
    <div v-else id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/contacts">Contacts</router-link> |
      <router-link to="/new">New Contact</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
      isMobile: false,
      mobileMenuOpen: false,
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
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
  },
};
</script>

<style scoped>
#nav {
  /* Web styles */
}

#nav-mobile {
  position: relative;
}

.h-mobile {
  display: flex;
}

.hamburger {
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  top: 10px;
  left: 10px;
}

.mobile-menu {
  z-index: 1;
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mobile-menu a {
  padding: 10px;
  text-decoration: none;
  color: #333;
  width: 100%;
  text-align: center;
}

.mobile-menu a:hover {
  background-color: #f0f0f0;
}

/* Additional media queries for more specific styling */
@media (max-width: 768px) {
  #nav {
    display: none;
  }
  #nav-mobile {
    display: block;
  }
}
</style>
