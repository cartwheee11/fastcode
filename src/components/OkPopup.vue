<template>
  <div class="back-screen"></div>
  <div class="container">
    <h3 class="title">{{ title }}</h3>
    <p class="title">{{ text }}</p>
    <p>
      <button @click="onButtonClick">{{ buttonText }}</button>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: "",
    },

    text: {
      type: String,
      required: false,
      default: "",
    },

    buttonText: {
      type: String,
      required: false,
      default: "Ok",
    },
  },

  methods: {
    onKeyPress(e) {
      if (e.key == "Enter") {
        this.onButtonClick();
      }
    },

    onButtonClick() {
      this.$emit("button-click");
    },
  },

  mounted() {
    document.addEventListener("keypress", this.onKeyPress);
  },

  unmounted() {
    document.removeEventListener("keypress", this.onKeyPress);
  },
};
</script>

<style scoped>
.container {
  position: fixed;
  top: 100px;
  background: white;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  width: 600px;
  margin: 0 auto;
  left: calc(50% - 300px);
}

button {
  margin: 0 auto;
}

.back-screen {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  opacity: 0.2;
  background: black;
}
</style>