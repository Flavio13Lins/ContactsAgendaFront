<template>
  <div class="dialog">
    <div class="dialog-content">
      <h2>{{ confirmText }}</h2>
      <div class="btns-area">
        <PrimeButton
          :label="btnConfirmText"
          icon="pi pi-check"
          @click="$emit('confirm')"
          class="confirm-button"
        />
        <PrimeButton
          :label="btnCancelText"
          icon="pi pi-times"
          @click="$emit('cancel')"
          class="p-button-danger"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmDialog",
  props: {
    confirmText: {
      type: String,
      default: "Are you sure?",
    },
    btnConfirmText: {
      type: String,
      default: "Yes",
    },
    btnCancelText: {
      type: String,
      default: "No",
    },
  },
  data() {
    return {};
  },
};
</script>

<style>
.dialog {
  position: fixed;
  z-index: 9999; /* Increased z-index to ensure it is in front of everything */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: black;
  background-color: rgba(
    0,
    0,
    0,
    0.8
  ); /* Increased opacity to obscure content behind */
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-content {
  display: flex;
  flex-direction: column;
  background-color: white;
  min-width: 600px;
  min-height: 300px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  justify-content: space-between;
  text-align: center;
}

.confirm-button {
  margin: 10px;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  background-color: #3d3d3d;
}

.btns-area {
  display: flex;
  justify-content: space-between;
}

@media (max-width: 768px) {
  .dialog-content {
    min-width: 300px;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
}
</style>
