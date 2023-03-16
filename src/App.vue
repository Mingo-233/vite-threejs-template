<script setup lang="ts">
import { onMounted } from "vue";
import World from "./ts/world/Word";
onMounted(() => {
  const dom = document.querySelector("#threejs-canvas") as HTMLElement;
  new World({
    dom,
  });
});
// threejs-canvas
</script>

<template>
  <div>
    <div id="threejs-canvas"></div>
  </div>
</template>

<style scoped></style>
