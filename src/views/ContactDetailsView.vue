<template>
  <div class="">
    <ContactDetails :contactId="contactId" />
  </div>
</template>

<script>
import ContactDetails from "@/components/ContactDetails.vue";

export default {
  name: "ContactDetailsView",
  components: {
    ContactDetails,
  },
  props: {},
  data() {
    return {
      contactId: this.$route.params.contactId,
    };
  },
  methods: {},
  created() {},
};
</script>

<style></style>
