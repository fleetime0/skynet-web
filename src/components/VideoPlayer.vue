<template>
  <video ref="videoRef" class="video-box" autoplay muted playsinline disablePictureInPicture />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { createWebRTCPlayer } from '../webrtc/webRTCPlayerManager'
import { RUNTIME_CONFIG } from '../runtime-config'

const videoRef = ref(null)

onMounted(() => {
  createWebRTCPlayer(videoRef.value, RUNTIME_CONFIG.STREAM_URL)
})
</script>

<style scoped>
.video-box {
  width: 100%;
  height: 100%;
  background-color: black;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  box-sizing: border-box;
}
</style>