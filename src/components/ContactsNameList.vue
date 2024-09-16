<template>
  <div class="contacts">
    <div v-if="loading">
      <h3>Loading...</h3>
    </div>
    <PrimeDataTable
      v-else
      :value="contacts"
      responsiveLayout="scroll"
      class="custom-datatable"
    >
      <PrimeColumn field="name" header="">
        <template #body="slotProps">
          <div
            @click="openContactDetails(slotProps.data.id)"
            class="contact-line"
          >
            <p>{{ slotProps.data.name }}</p>
          </div>
        </template>
      </PrimeColumn>
    </PrimeDataTable>
    <div v-if="error">
      <p>An error occurred: {{ error.message }}</p>
      <PrimeButton
        label="Refresh"
        icon="pi pi-refresh"
        @click="refreshContacts"
        class="p-button-success"
      />
    </div>
  </div>
</template>

<script>
import { fetchContacts } from "@/api/agendaApi.js";

export default {
  name: "ContactsNameList",
  data() {
    return {
      loading: false,
      contacts: [],
      error: null,
    };
  },
  methods: {
    async loadContacts() {
      this.loading = true;
      try {
        const response = await fetchContacts();
        this.contacts = response.data.value;
        this.error = null;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = error;
      }
    },
    async refreshContacts() {
      await this.loadContacts();
    },
    openContactDetails(contactId) {
      this.$router.push({ name: "Details", params: { contactId } });
    },
  },
  async created() {
    await this.loadContacts();
  },
};
</script>

<style>
/* center the content in contacts class */
.contacts {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.contact-line {
  padding: 1rem;
  cursor: pointer;
}
</style>
