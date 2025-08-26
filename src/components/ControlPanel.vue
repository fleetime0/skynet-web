<template>
  <div class="control-container">
    <div class="dpad">
      <button @mousedown.prevent="() => send('forward')" @touchstart.prevent="() => send('forward')" @mouseup="() => send('stop')"
        @touchend="() => send('stop')">↑</button>
      <div class="row">
        <button @mousedown.prevent="() => send('turn_left')" @touchstart.prevent="() => send('turn_left')" @mouseup="() => send('stop')"
          @touchend="() => send('stop')">←</button>
        <button @mousedown.prevent="() => send('turn_right')" @touchstart.prevent="() => send('turn_right')" @mouseup="() => send('stop')"
          @touchend="() => send('stop')">→</button>
      </div>
      <button @mousedown.prevent="() => send('backward')" @touchstart.prevent="() => send('backward')" @mouseup="() => send('stop')"
        @touchend="() => send('stop')">↓</button>
    </div>
    <div class="middle-toggle">
      <button class="toggle-btn" :class="{ disabled: !enabled }" @click="toggleControl">
        {{ enabled ? '停止' : '启用' }}
      </button>
    </div>
    <div class="turn-buttons">
      <div class="extra-btns">
        <button @click="send('horn')">鸣笛</button>
        <button @click="send('rgb_toggle')">灯效</button>
      </div>
      <!--
      <div class="turn-direction">
        <button @mousedown.prevent="() => send('turn_left')" @touchstart.prevent="() => send('turn_left')" @mouseup="() => send('stop')"
          @touchend="() => send('stop')">↶</button>
        <button @mousedown.prevent="() => send('turn_right')" @touchstart.prevent="() => send('turn_right')"
          @mouseup="() => send('stop')" @touchend="() => send('stop')">↷</button>
      </div>
      -->
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import useRos from '../ros/useRos';

// Get the ROS logic from the hook
const { enabled, send, toggleControl } = useRos();

onMounted(() => {
  window.addEventListener('mouseup', onRelease);
  window.addEventListener('touchend', onRelease);
});

onUnmounted(() => {
  window.removeEventListener('mouseup', onRelease);
  window.removeEventListener('touchend', onRelease);
});

function onRelease() {
  send('stop');
}
</script>

<style scoped>
.control-container {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dpad,
.dpad .row {
  width: 120px;
}

.dpad {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.dpad .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

button {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #fff;
  background: #3499da;
  border: none;
  border-radius: 8px;
}

.toggle-btn {
  background: #e74d3c;
}

.turn-buttons button {
  margin-left: 5px;
  margin-right: 5px;
}

.extra-btns,
.turn-direction {
  display: flex;
  align-items: center;
}

.turn-direction button {
  margin-top: 10px;
}

@media (min-width: 768px) {
  .control-container {
    padding: 40px;
  }

  .dpad,
  .dpad .row {
    width: 240px;
  }

  button {
    width: 80px;
    height: 80px;
    font-size: 20px;
    border-radius: 12px;
  }

  .turn-buttons button {
    margin-left: 10px;
    margin-right: 10px;
  }

  .turn-direction button {
    margin-top: 20px;
  }
}
</style>