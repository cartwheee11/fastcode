<template>
  <div class="container">
    <div class="title-section">
      <h1>JavaScript fast input trainer</h1>
    </div>

    <div class="text-section">
      <span
        v-for="(word, i) in words"
        :key="i"
        class="word"
        :class="word.state"
        >{{ word.text }}</span
      >
    </div>

    <div class="input-section">
      <div class="input-section-inner-wrapper">
        <p class="timer">
          <img
            src="https://img.icons8.com/fluent-systems-filled/50/000000/timer.png"
          />{{ timeRemaining }} sec. · words: {{ wordsEntered }} · symbols:
          {{ symbolsEntered }}
        </p>
        <input
          ref="input"
          v-model="input"
          @input="onInput"
          type="text"
          placeholder='Type and press "space"'
        />
        <button @click="onRestartButtonClick">
          <img src="/images/reload icon white.png" alt="" />
        </button>
      </div>
    </div>
  </div>

  <ok-popup
    @button-click="onOkPopupButtonClick"
    v-if="okPopup"
    :title="okPopup.title"
    :text="okPopup.text"
    :buttonText="okPopup.buttonText"
  />
</template>

<script>
// @ is an alias to /src

class Word {
  constructor(text, state = "current") {
    this.text = text;
    this.state = state;
  }

  setState(state) {
    this.state = state;
  }
}

import OkPopup from "../components/OkPopup.vue";

export default {
  name: "Home",

  components: {
    OkPopup,
  },

  data() {
    return {
      currentWordId: 0,
      words: [],
      wordsNumber: 0,
      lettersNumber: 0,
      wordsToPrint: 100,
      dataSet: require("../assets/dataset.json"),
      input: "",
      defaultTime: 60,
      timeRemaining: 0,
      timerGoing: false,
      timer: null,
      wordsEntered: 0,
      symbolsEntered: 0,
      okPopup: null,
    };
  },

  mounted() {
    this.words = this.getRandomWords(this.dataSet, this.wordsToPrint);
    this.timeRemaining = this.defaultTime;
  },

  methods: {
    onRestartButtonClick() {
      this.stopTimer();
      this.okPopup = null;
      this.wordsEntered = 0;
      this.symbolsEntered = 0;
      this.input = "";
      this.$refs.input.focus();
      this.words = this.getRandomWords(this.dataSet, this.wordsToPrint);
    },

    onOkPopupButtonClick() {
      this.okPopup = null;
      this.wordsEntered = 0;
      this.symbolsEntered = 0;
      this.input = "";
      this.$refs.input.focus();
      this.words = this.getRandomWords(this.dataSet, this.wordsToPrint);
    },

    showResult() {
      this.okPopup = {
        title: "Your result is",
        text:
          this.wordsEntered + " words and " + this.symbolsEntered + " symbols",
        buttonText: "Got it!",
      };
    },

    timerTick() {
      if (!this.timeRemaining) {
        this.stopTimer();
        this.showResult();
        this.$refs.input.blur();
        return;
      }

      this.timeRemaining--;
    },

    startTimer() {
      this.timerGoing = true;
      this.timer = setInterval(this.timerTick, 1000);
    },

    stopTimer() {
      clearInterval(this.timer);
      this.timerGoing = false;
      this.timeRemaining = this.defaultTime;
    },

    onInput(e) {
      if (!this.timerGoing) {
        this.startTimer();
      }

      if (!this.words[0].text.startsWith(this.input)) {
        this.words[0].setState("typo");
      } else {
        this.words[0].setState("current");
      }

      if (e.data == " ") {
        if (this.input.replace(" ", "") == this.words[0].text) {
          this.wordsEntered++;
          this.symbolsEntered += this.words[0].text.length;

          this.words.shift();
          this.words.push(this.getRandomWords(this.dataSet, 1)[0]);
          this.words[this.words.length - 1].setState("");
          this.words[0].setState("current");
          this.input = "";
        }
      }
    },

    getRandomWords(dataSet, n) {
      let len = dataSet.length;
      let arr = [];
      for (let i = 0; i < n; i++) {
        let rand = Math.floor(Math.random() * len);
        let word = new Word(dataSet[rand], i ? "" : "current");
        arr.push(word);
      }
      return arr;
    },
  },
};
</script>

<style scoped>
.container {
  width: 800px;
  background: #ffffff;
  border-left: 2px solid #e6e6e6;
  border-right: 2px solid #e6e6e6;
  height: 100vh;
  margin: 0 auto;
  padding: 30px;
  position: relative;
  overflow: hidden;
}

.input-section-inner-wrapper {
  vertical-align: top;
  padding: 30px;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.input-section {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
  box-shadow: white 0px 0px 100px 100px;
}

.input-section button {
  padding: 22px;
  height: 100px;
  display: block;
  border: none;
  border-radius: 14px;
  background: black;
  width: 100px;
  transition: 0.4s;
  cursor: pointer;
}

.input-section button:hover {
  transform: scale(1.04);
}

.input-section button img {
  transition: 0.4s;
}

.input-section button:hover img {
  transform: rotate(180deg);
  transition: transform 0.4s;
}

.input-section input {
  padding: 22px;
  height: 100px;
  /* width: 100px; */
  margin: 0;
  padding: 0;
  display: block;
  flex-grow: 1;
  border: none;
  background: #e6e6e6;
  border-radius: 14px;
  padding-left: 30px;
}

.text-section .word {
  padding: 3px 10px;
  margin-right: 5px;
  display: inline-block;
}

.text-section .missed {
  color: #c3c3c3;
}

.text-section .typo {
  color: white;
  background: rgb(255, 117, 117);
  border-radius: 28px;
}

.text-section .current {
  background: #e6e6e6;
  border-radius: 28px;
}

.timer {
  display: block;
  font-size: 20px;
  margin: 0;
  flex-basis: 1000px;
  opacity: 0.5;
}

.timer img {
  vertical-align: bottom;
  height: 25px;
  margin-right: 10px;
}

h1 {
  margin-top: 0;
  font-size: 50px;
}
</style>