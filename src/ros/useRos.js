// useRos.js
import { ref } from 'vue';
import ROSLIB from 'roslib';
import { RUNTIME_CONFIG } from '../runtime-config';

export default function useRos() {
  const ros = new ROSLIB.Ros({ url: RUNTIME_CONFIG.ROS_BRIDGE_URL });
  const cmdVelTopic = new ROSLIB.Topic({
    ros,
    name: '/cmd_vel',
    messageType: 'geometry_msgs/msg/Twist',
  });
  const buzzerTopic = new ROSLIB.Topic({
    ros,
    name: '/buzzer',
    messageType: 'std_msgs/msg/Bool',
  });
  const rgbLightTopic = new ROSLIB.Topic({
    ros,
    name: '/rgb_light',
    messageType: 'std_msgs/msg/Int32',
  });
  const webStateTopic = new ROSLIB.Topic({
    ros,
    name: '/web_ctrl_state',
    messageType: 'std_msgs/msg/Bool',
  });

  const enabled = ref(false);
  let buzzerActive = false;
  let lightIndex = 0;

  let lastWebToggleTime = 0;
  let lastBuzzerTime = 0;
  let lastLightTime = 0;

  let isMoving = false;

  const publishCmdVel = (linearX, linearY, angularZ) => {
    const twist = new ROSLIB.Message({
      linear: { x: linearX, y: linearY, z: 0 },
      angular: { x: 0, y: 0, z: angularZ },
    });
    cmdVelTopic.publish(twist);
  };

  const toggleControl = () => {
    const now = Date.now();
    if (now - lastWebToggleTime > 250) {
      enabled.value = !enabled.value;
      webStateTopic.publish(new ROSLIB.Message({ data: enabled.value }));
      lastWebToggleTime = now;
    }
  };

  const send = (cmd) => {
    const now = Date.now();

    if (!enabled.value) {
      return;
    }

    switch (cmd) {
      case 'forward':
        publishCmdVel(0.5, 0, 0);
        isMoving = true;
        break;
      case 'backward':
        publishCmdVel(-0.5, 0, 0);
        isMoving = true;
        break;
      case 'left':
        publishCmdVel(0, 0.5, 0);
        isMoving = true;
        break;
      case 'right':
        publishCmdVel(0, -0.5, 0);
        isMoving = true;
        break;
      case 'turn_left':
        publishCmdVel(0, 0, 5.0);
        isMoving = true;
        break;
      case 'turn_right':
        publishCmdVel(0, 0, -5.0);
        isMoving = true;
        break;
      case 'horn':
        if (now - lastBuzzerTime > 250) {
          buzzerActive = !buzzerActive;
          buzzerTopic.publish(new ROSLIB.Message({ data: buzzerActive }));
          lastBuzzerTime = now;
        }
        break;
      case 'rgb_toggle':
        if (now - lastLightTime > 250) {
          lightIndex = (lightIndex + 1) % 7;
          rgbLightTopic.publish(new ROSLIB.Message({ data: lightIndex }));
          lastLightTime = now;
        }
        break;
      case 'stop':
        if (isMoving) {
          publishCmdVel(0, 0, 0);
          isMoving = false;
        }
        break;
      default:
        console.warn(`Unknown command: ${cmd}`);
    }
  }

  return {
    enabled,
    send,
    toggleControl,
  };
}
