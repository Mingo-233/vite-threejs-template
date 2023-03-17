<script setup lang="ts">
import { onMounted } from 'vue';
import World from '@/world/Word';
onMounted(() => {
  const dom = document.querySelector('#threejs-canvas') as HTMLElement;
  new World({
    dom,
  });
});
</script>

<template>
  <div>
    <h1 class="title">vite + threejs template 基类</h1>
    <div id="threejs-canvas"></div>
  </div>
</template>

<style lang="less" scoped>
.title {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(to right, violet, indigo, blue, green, yellow, orange, red);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
