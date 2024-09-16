<template>
  <PrimeDialog
    :visible="editorDialogVisible"
    :closable="false"
    :dismissableMask="true"
    @update:visible="editorDialogVisible = $event"
    modal
  >
    <dialogEditContact
      :contactId="contactId"
      @closeDialog="editorDialogVisible = false"
      @updated="refreshContact"
    />
  </PrimeDialog>
  <PrimeDialog
    :visible="deleteDialogVisible"
    :closable="false"
    :dismissableMask="true"
    @update:visible="deleteDialogVisible = $event"
    modal
  >
    <dialogConfirm
      :confirmText="`Are you sure you want to delete ${contact.name}?`"
      btnConfirmText="Delete"
      btnCancelText="Cancel"
      @cancel="deleteDialogVisible = false"
      @confirm="removeContact"
    />
  </PrimeDialog>
  <div v-if="loading">
    <h3>Loading...</h3>
  </div>
  <div class="contact-details" v-else-if="!editorDialogVisible">
    <h2>Contact Details</h2>
    <div>
      <p>Details of the selected contact</p>
      <div v-if="!loading && validContact()">
        <h3>{{ contact.name }}</h3>
        <p>Phone: {{ contact.phone }}</p>
        <p>
          Email:
          <a :href="'mailto:' + contact.email" target="_blank">{{
            contact.email
          }}</a>
        </p>
        <div class="button-group">
          <PrimeButton
            label="Edit"
            icon="pi pi-pencil"
            @click="editContact"
            class="btn-edit"
          />
          <PrimeButton
            label="Remove"
            icon="pi pi-trash"
            @click="openConfirmDelete"
            class="btn-remove"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-if="error">
    <p>An error occurred: {{ error.message }}</p>
    <PrimeButton
      label="Refresh"
      icon="pi pi-refresh"
      @click="refreshContact"
      class="p-button-success"
    />
  </div>
</template>

<script>
import { fetchContactById, deleteContact } from "@/api/agendaApi.js";
import ContactEditor from "@/components/ContactEditor.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";

export default {
  name: "ContactDetails",
  props: {
    contactId: {
      type: Number,
      required: true,
      default: 2,
    },
  },
  components: {
    dialogEditContact: ContactEditor,
    dialogConfirm: ConfirmDialog,
  },
  data() {
    return {
      loading: false,
      editorDialogVisible: false,
      deleteDialogVisible: false,
      contact: {},
      error: null,
    };
  },
  watch: {
    contactId() {
      this.loadContact();
    },
  },
  mounted() {
    this.validContact();
  },
  methods: {
    validContact() {
      if (
        this.contact &&
        this.contact?.name &&
        this.contact?.phone &&
        this.contact?.email
      )
        return true;

      return true;
    },
    async loadContact() {
      this.loading = true;
      if (!this.contactId) {
        this.loading = false;
        this.error = { message: "Contact ID is required" };
        return;
      }
      try {
        const response = await fetchContactById(this.contactId);
        this.contact = response.data;
        this.error = null;
      } catch (error) {
        this.error = error;
      }
      this.loading = false;
    },
    async refreshContact() {
      await this.loadContact();
    },
    editContact() {
      // show dialog to edit contact
      this.editorDialogVisible = true;
    },
    openConfirmDelete() {
      // show dialog to confirm delete
      this.deleteDialogVisible = true;
    },
    removeContact() {
      this.loading = true;
      this.deleteDialogVisible = false;
      // remove contact
      deleteContact(this.contactId)
        .then(() => {
          this.$router.push({ name: "Contacts" });
          this.error = null;
          this.loading = false;
        })
        .catch((error) => {
          this.error = error;
          this.loading = false;
        });
    },
  },
  async created() {
    await this.loadContact();
  },
};
</script>

<style scoped>
.contact-details {
  padding: 20px;
}
.btn-edit {
  display: inline-block;
  padding: 10px 20px;
  margin-top: 20px;
  color: #4297b9;
  text-decoration: none;
  border-radius: 5px;
}

.btn-remove {
  display: inline-block;
  padding: 10px 20px;
  margin-top: 20px;
  color: #b96642;
  text-decoration: none;
  border-radius: 5px;
}

.button-group {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

/* Additional media queries for more specific styling */
@media (max-width: 768px) {
  .button-group {
    flex-direction: column;
    align-items: center;
  }
}
</style>
