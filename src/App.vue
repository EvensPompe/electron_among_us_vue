<template>
  <div id="app">
    <GameCanvas />
  </div>
</template>

<script>
import GameCanvas from "./components/GameCanvas.vue"
export default {
  name: 'App',
  components: {
    GameCanvas,
  }
}
</script>

<style>
body {
  background-color: black;
}
</style>
