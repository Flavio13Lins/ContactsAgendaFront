<template>
  <div class="contacts">
    <h2>Contacts</h2>
    <h4>List of your contacts</h4>
    <ContactsNameList class="p-datatable" />
    <!-- if mobile -->
    <PrimeButton
      v-if="isMobile"
      class="btn-add-contact"
      icon="pi pi-plus"
      @click="$router.push({ name: 'NewContact' })"
    />
  </div>
</template>

<script>
import ContactsNameList from "@/components/ContactsNameList.vue";

export default {
  name: "ContactsView",
  components: {
    ContactsNameList,
  },
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
.contacts {
  padding: 1rem;
}

h2,
h4 {
  text-align: center;
}

.p-datatable {
  width: 100%;
}

.btn-add-contact {
  /* fab btn to add contact */
  display: block;
  position: fixed;
  bottom: 20px;
  right: 20px;

  padding: 15px 10px 10px 15px;
  background-color: #4297b9;
  color: white;
  text-decoration: none;
  border-radius: 100%;
}

@media screen and (max-width: 768px) {
  .p-datatable {
    font-size: 0.8rem;
  }
}
</style>
