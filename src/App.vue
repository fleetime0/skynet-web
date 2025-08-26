<!-- App.vue -->
<template>
  <div class="app-container">
    <div class="video-wrap">
      <VideoPlayer />
    </div>
    <div class="control-wrap">
      <ControlPanel />
    </div>
  </div>
</template>

<script setup>
import VideoPlayer from './components/VideoPlayer.vue'
import ControlPanel from './components/ControlPanel.vue'
</script>

<style scoped>
  .app-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    position: relative;
  }
  .video-wrap {
    flex: 1;
    overflow: hidden;
  }
</style>