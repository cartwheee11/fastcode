<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <router-view />
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
  overflow: hidden;
}

@font-face {
  font-family: "ibmm-m";
  src: url("/fonts/IBMPlexMono-Medium.ttf");
}

@font-face {
  font-family: "montserrat-ex";
  src: url("/fonts/Montserrat-ExtraBold.ttf");
}

h1 {
  font-family: "montserrat-ex";
  color: black;
}

h3 {
  font-family: "montserrat-ex";
}

button {
  cursor: pointer;
  padding: 22px;
  height: 100px;
  display: block;
  border: none;
  border-radius: 14px;
  background: black;
  /* width: 100px; */
  color: white;
}

#app,
input,
button {
  font-family: "ibmm-m";
  font-size: 35px;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
