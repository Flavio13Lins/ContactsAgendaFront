<template>
  <div class="contacts">
    <PrimePanel header="List" class="custom-panel">
      <div v-if="loading">
        <h3>Loading...</h3>
      </div>
      <div v-if="error">
        <p>An error occurred: {{ error.message }}</p>
        <PrimeButton
          label="Refresh"
          icon="pi pi-refresh"
          @click="refreshContacts"
          class="p-button-success"
        />
      </div>
      <PrimeDataTable
        v-else
        :value="contacts"
        responsiveLayout="scroll"
        :rows="6"
        paginator
        :globalFilterFields="['name']"
        paginatorTemplate="PrevPageLink CurrentPageReport NextPageLink"
        currentPageReportTemplate=" Total of {totalRecords} Contacts "
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
        <PrimeColumn field="phone" header="">
          <template #body="slotProps">
            <div
              @click="openContactDetails(slotProps.data.id)"
              class="contact-phone"
            >
              <p>{{ slotProps.data.phone }}</p>
            </div>
          </template>
        </PrimeColumn>
      </PrimeDataTable>
    </PrimePanel>
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
  padding: 1rem 0;
  cursor: pointer;
}
.contact-phone {
  display: flex;
  flex-direction: row;
  justify-content: end;
  padding: 1rem 0;
  cursor: pointer;
}
</style>
