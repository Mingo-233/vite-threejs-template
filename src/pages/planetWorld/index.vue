<script setup lang="ts">
import { onMounted } from 'vue';
import World from '@/case/PlanetWorld';
onMounted(() => {
  const dom = document.querySelector('#threejs-canvas') as HTMLElement;
  new World({
    dom,
  });
});
</script>

<template>
  <div>
    <div id="threejs-canvas"></div>
  </div>
</template>
