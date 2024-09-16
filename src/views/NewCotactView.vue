<template>
  <div class="contact-creator">
    <h2>New Contact</h2>

    <div v-if="loading">
      <p>Loading...</p>
    </div>

    <div v-else-if="error">
      <p>An error occurred: {{ error?.message }}</p>
      <PrimeButton
        label="Refresh"
        icon="pi pi-refresh"
        @click="$router.push({ name: 'NewContact' })"
        class="p-button-success"
      />
    </div>

    <div v-else>
      <p>Here you can add a new contact</p>
      <div class="p-card">
        <div>
          <label for="name">Name:</label>
          <input
            type="text"
            id="name"
            v-model="contact.name"
            @input="validateName"
          />
          <span v-if="nameError" class="error">{{ nameError }}</span>
        </div>
        <div>
          <label for="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            v-model="contact.phone"
            v-mask="'+##-##-#####-####'"
            @input="validatePhone"
          />
          <span v-if="phoneError" class="error">{{ phoneError }}</span>
        </div>
        <div>
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            v-model="contact.email"
            @input="validateEmail"
          />
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>
        <div class="btns-area">
          <PrimeButton
            :disabled="invalidContact"
            label="Save"
            icon="pi pi-save"
            @click="saveContact"
            class="btn-save"
          />
          <PrimeButton
            label="Cancel"
            icon="pi pi-times"
            @click="$emit('closeDialog')"
            class="btn-cancel"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createContact } from "@/api/agendaApi.js";

export default {
  name: "NewContact",
  props: {
    contactId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      invalidContact: false,
      contact: {
        name: "",
        phone: "",
        email: "",
      },
      error: null,
      nameError: "",
      emailError: "",
    };
  },
  watch: {
    contact: {
      handler() {
        this.validateName();
        this.validatePhone();
        this.validateEmail();
        this.validContact();
      },
      deep: true,
    },
  },
  methods: {
    validContact() {
      if (
        this.contact &&
        this.contact?.name &&
        this.contact?.phone &&
        this.contact?.email
      )
        this.invalidContact = false;
      else this.invalidContact = true;
    },
    validateName() {
      if (this.contact.name.length > 255) {
        this.nameError = "Name must be less than 255 characters";
      } else {
        this.nameError = "";
      }
    },
    validatePhone() {
      if (this.contact.phone.length > 50) {
        this.phoneError = "Phone must be less than 50 characters";
      } else {
        this.phoneError = "";
      }
    },
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (this.contact.email.length > 255) {
        this.emailError = "Email must be less than 255 characters";
      } else if (!emailPattern.test(this.contact.email)) {
        this.emailError = "Invalid email format";
      } else {
        this.emailError = "";
      }
    },
    async saveContact() {
      if (this.nameError || this.phoneError || this.emailError) {
        this.error = { message: "Invalid data" };
        return;
      }
      this.loading = true;
      // create new contact
      createContact(this.contact)
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
  async created() {},
};
</script>

<style scoped>
.contact-creator {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 0 auto;
  max-width: 600px;
  border-radius: 8px;
}

.contact-creator h2 {
  text-align: center;
  margin-bottom: 20px;
}

.contact-creator label {
  margin-top: 10px;
  font-weight: bold;
}

.contact-creator input {
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.contact-creator .p-button-success {
  margin-top: 20px;
  align-self: center;
}

.btn-save {
  display: inline-block;
  padding: 10px 20px;
  margin-top: 20px;
  color: #4297b9;
  text-decoration: none;
}

.btn-cancel {
  display: inline-block;
  padding: 10px 20px;
  margin-top: 20px;
  color: #fff;
  background-color: #000000;
  text-decoration: none;
  border-radius: 5px;
}

.btns-area {
  display: flex;
  justify-content: space-between;
}

@media (max-width: 768px) {
  .contact-creator {
    padding: 10px;

    min-width: 300px;
  }

  .contact-creator h2 {
    font-size: 1.5em;
  }

  .contact-creator input {
    padding: 8px;
  }

  .contact-creator .p-button-success {
    width: 100%;
  }
}
.error {
  color: red;
}
</style>
